import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './db/connectDB.js'
import routes from './routes.js'
import './src/cron/jobs.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
const port = process.env.PORT || 3000

//Connect to MongoDB
connectDB()


app.use('/api/v1', routes)
app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


// =======================================================
// Milestone Completed: Basic Task Execution (Simulated)
// =======================================================
//
// Implemented the foundational flow of the task orchestration system:
//
// - Task creation and persistence
// - Cron-based scheduler to detect executable tasks
// - Simulated task execution for SEND_EMAIL
//   (email sending is mocked by storing execution data in a table)
// - Task state transitions (PENDING → RUNNING → SUCCESS / RETRY / DEAD)
// - Error logging for failed executions
// - Retry mechanism with delayed re-attempts
//
// Email delivery is intentionally mocked to keep the focus on
// scheduling, state management, and failure handling rather than
// external integrations.
//
// This completes the initial, end-to-end execution pipeline.
// =======================================================

// =======================================================
// Project Status
// =======================================================
//
// The initial scope of this project is intentionally kept
// small but substantial.
//
// The goal was to build and understand the core mechanics
// of a background task scheduling and execution system,
// not to fully replicate a production-ready job framework.
//
// At this stage, the foundational concepts have been
// implemented and validated. Further expansion is
// intentionally deferred, as the objective of this
// project has been achieved.
//
// Development on this topic is concluded for now.
// =======================================================
