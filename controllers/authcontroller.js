const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require("../models/usermodel");

module.exports.register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // Log the incoming request body
        console.log("Request body:", req.body);

        // Validate that the password is provided
        if (!password) {
            return res.status(400).json({ error: "Password is required." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password, salt);

        console.log("Hashing complete, creating new user...");

        const newUser = new User({ username, email, password: hashpassword, role });

        await newUser.save();

        console.log("User saved successfully");
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ error: error.message });
    }
};


module.exports.login = async(req,res)=>{
    const { email, password } = req.body;
    const user = await User.findOne({email});
    if(!user) return res.status(400).json({error: "user not found"});

    const ismatch = await bcrypt.compare(password,user.password);
    if(!ismatch) return res.status(400).json({error: "invalid password"});

    const token = jwt.sign({_id: user._id, role: user.role},process.env.TOKEN_SECRET,{expiresIn: "1h"});
    res.json({token});
}

module.exports.assignrole = async(req,res)=>{
    const { role } = req.body;
    if(req.use.role !== 'Admin') return res.status(403).json({error: "only admin access"});

    try{
        await user.findByIdAndUpdate(req.params.userid, {role});
        res.json({message: "Role Updated successfully"});
    }
    catch(err){
        res.status(400).json({error: "role update failed"});
    }
}