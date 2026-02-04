import cron from 'node-cron';
import { tasksModel } from '../../models/taskSchema.js';

cron.schedule('*/15 * * * * *', async () => {
    const now = new Date();
    const MAX_TASKS_PER_TICK = 5;
    const PROCESSING_TIMEOUT_MS = 5 * 60 * 1000; // 5 min
    const MAX_RETRIES = 5;

    /* ----------------------------------------
       Recover stuck PROCESSING tasks
    -----------------------------------------*/
    const timeoutDate = new Date(now - PROCESSING_TIMEOUT_MS);

    await tasksModel.updateMany(
        {
            status: 'PROCESSING',
            processing_started_at: { $lte: timeoutDate }
        },
        {
            $set: {
                status: 'PENDING',
                processing_started_at: null,
                availableAt: now
            }
        }
    );

    /* ----------------------------------------
       Process tasks (controlled batch)
    -----------------------------------------*/
    for (let i = 0; i < MAX_TASKS_PER_TICK; i++) {
        const task = await tasksModel.findOneAndUpdate(
            {
                status: 'PENDING',
                availableAt: { $lte: now }
            },
            {
                $set: {
                    status: 'PROCESSING',
                    processing_started_at: new Date(),
                    availableAt: null
                },
                $inc: { retryCount: 1 }
            },
            { new: true }
        );

        if (!task) break;

        try {
            /* ----------------------------------------
              ACTUAL TASK LOGIC HERE
            -----------------------------------------*/
            // await doWork(task);

            await tasksModel.updateOne(
                { _id: task._id },
                {
                    $set: {
                        status: 'COMPLETED',
                        processing_completed_at: new Date()
                    }
                }
            );
        } catch (err) {
            /* ----------------------------------------
               Retry or fail
            -----------------------------------------*/
            if (task.retryCount >= MAX_RETRIES) {
                await tasksModel.updateOne(
                    { _id: task._id },
                    {
                        $set: {
                            status: 'FAILED',
                            processing_completed_at: new Date()
                        }
                    }
                );
                continue;
            }

            const retryDelayMs = Math.min(
                2 ** task.retryCount * 1000,
                5 * 60 * 1000
            );

            await tasksModel.updateOne(
                { _id: task._id },
                {
                    $set: {
                        status: 'PENDING',
                        processing_started_at: null,
                        availableAt: new Date(Date.now() + retryDelayMs)
                    }
                }
            );
        }
    }
});
