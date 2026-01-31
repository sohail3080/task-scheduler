import express from 'express'
import { createTask } from './controllers/taskController.js'

const router = express.Router()

//Testing V1 Route -> GET /api/v1
router.get('/', (req, res) => {
    res.send('V1 API is running')
})

//Create a new Task -> POST /api/v1/tasks
router.post('/tasks', createTask)

export default router