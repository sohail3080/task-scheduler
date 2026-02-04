import { tasksModel } from '../models/taskSchema.js'

//Create a new task
export const createTask = async (req, res) => {
    try {
        const { type, payload, runAt, availableAt } = req.body
        const task = await tasksModel.create({ type, payload, runAt, availableAt })
        res.status(201).json(task)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

//View all tasks
export const viewAllTasks = async (req, res) => {
    try {
        const taskCount = await tasksModel.countDocuments()
        const tasks = await tasksModel.find()
        res.status(200).json({
            taskCount: taskCount,
            tasks: tasks
        })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}