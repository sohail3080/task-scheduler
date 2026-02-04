import mongoose from 'mongoose'

const failedLogSchema = new mongoose.Schema({
   taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'tasks',
    required: true
   },
   taskStatus: {
    type: String,
    required: true
   },
   errorMessage: {
    type: String,
    required: true
   },
}, { timestamps: true });

export const failedLogModel = mongoose.model("failedLog", failedLogSchema);
