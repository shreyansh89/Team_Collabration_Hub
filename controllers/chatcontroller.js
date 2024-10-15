const chatmessage = require("../models/chatmessagemodel");

module.exports.gettheChatMessage = async(req,res)=>{
    const { projectId } = req.params;
    try{
        const message = await chatmessage.find({projectId}).sort({ Timestamp: 1});
        res.json(message);
    }
    catch(err){
        res.status(500).json({error: err.message});
    }
}