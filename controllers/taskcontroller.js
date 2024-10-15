const task = require("../models/taskmodel");

module.exports.createTask = async(req,res)=>{
    const {title, description, assignedTo } = req.body;
    const newTask = new task({ title, description, assignedTo })   

    try{
        await newTask.save();
        res.status(201).json(newTask)
    }
    catch(err){
        res.status(400).json({ error: "somthing wrong" })
    }
}

module.exports.getTask = async(req,res)=>{
    const {assignedTo , status} = req.query;
    const filter = {};
    if(assignedTo){
        filter.assignedTo = assignedTo;
    }
    
    if(status) filter.status = status;

    try{
        const tasks = await task.find(filter).populate('assignedTo');
        res.json(tasks)
    }
    catch(err){
        res.status(500).json({ error: "somthing wrong" })
    }
}

module.exports.deletetask = async(req,res) => {
    if(req.user.role !== 'Admin') return res.status(403).json({error: "somthing wrong"});
    try{
        await task.findByIdAndDelete(req.params.id)
        res.json({ message: "Task deleted successfully" })
    }
    catch(err){
        res.status(500).json({ error: "task not deleted " })
    }
}

module.exports.updateTask = async(req,res)=>{
    try{
        const updatTask = await task.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.json(updatTask)
    }
    catch(err){
        res.status(400).json({ error: "somthing wrong" })
    }
}