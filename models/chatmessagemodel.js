const mongoose = require('mongoose');

const chatmessageSchema = mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
    },
    username :{
        type: String,
        required: true
    },
    message :{
        type: String,
        required: true
    },
    Timestamp: {
        type: Date,
        default: Date.now()
    }
});

const chatmessage = mongoose.model("chatmessage", chatmessageSchema);
module.exports = chatmessage;