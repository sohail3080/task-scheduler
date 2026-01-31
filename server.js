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


//Next set of tasks:
//=======================================================
//Created the task,
//Now we have to handle the task execution/schedule
//We will check using cron-job, if the task is ready to be executed,
//If the task is ready, we will execute it.
//For now we are sending mail, we will just create an
//entry in a table for the execution of the task, if correctly
//executed, we will update the status and handle such.
//If not executed, we willl have a log table, where we will
//store the error and reason for the failure.
//We will also have a retry mechanism, if the task fails,
//We will retry the task after a certain time.