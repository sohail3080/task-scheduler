import cron from 'node-cron';

cron.schedule('*/30 * * * * *', () => {
    console.log('Running a task every second:', new Date().toLocaleString());
});