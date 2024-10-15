const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1/Team_Collaboration");

const db = mongoose.connection;

db.once('open' , (e)=>{
    if(e) console.log("db is not connected");
    console.log("db connected");
});

module.exports = db;