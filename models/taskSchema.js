import mongoose from 'mongoose'

const tasksSchema = new mongoose.Schema({
    //Type of the task --> SEND_EMAIL
    type: {
        type: String,
        required: true,
        enum: ['SEND_EMAIL']
    },
    //PENDING | READY | RUNNING | SUCCESS | FAILED
    status: {
        type: String,
        required: true,
        default: 'PENDING'
    },
    //Data for the task
    payload: {
        type: Object,
        required: true
    },
    runAt: {
        type: Date,
        required: true
    },
    availableAt: {
        type: Date,
        required: true
    },
    //Retry count for the task
    retryCount: {
        type: Number,
        required: true,
        default: 0
    },
    //Processing started at
    processing_started_at: {
        type: Date,
        required: false,
        default: null
    },
    //Processing completed at
    processing_completed_at: {
        type: Date,
        required: false,
        default: null
    },
}, { timestamps: true });

export const tasksModel = mongoose.model("tasks", tasksSchema);
