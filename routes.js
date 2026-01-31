import express from 'express'

const router = express.Router()

//Testing V1 Route -> GET /api/v1
router.get('/', (req, res) => {
    res.send('V1 API is running')
})

//Create a new Task -> POST /api/v1/tasks
router.post('/tasks', (req, res) => {
    console.log(req.body)
    res.status(201).json({
        success: true,
        message: 'Task created successfully',
        data: req.body
    })
})

export default router