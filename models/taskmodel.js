const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    description: String,
    assignedTo :{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status:{
        type: String,
        enum: ['Pending', 'In Progress', 'Completed'],
        default: 'Pending'
    }
});

const Task = mongoose.model("task", taskSchema);
module.exports = Task;