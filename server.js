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
