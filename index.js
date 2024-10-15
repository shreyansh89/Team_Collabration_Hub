const express = require("express");
const port = 8000;
const path = require("path");
const app = express();
const db = require("./config/mongoose");


const helmet = require("helmet");
const dotenv = require("dotenv");
const http = require("http");
const cors = require("cors");
const socketIo = require("socket.io");


const server = http.createServer(app);
const io = socketIo(server, {
    cors: {origin: "*", methods: ["GET" , "POST"]}
});


dotenv.config();
app.use(express.json());
app.use(cors());
app.use(helmet());


// io.on('connection', (socket)=>{
//     console.log("new clinet connected");
//     socket.on('joinRoom', (room)=>{
//         socket.join(room);
//     });
//     socket.on('sendMessage', (msg)=>{
//         io.to(msg.room).emit('message', msg);
//     });
//     socket.on('disconnect', ()=>{
//         console.log("user disconnected");
//     });
// })



//real-time chat handling
io.on('connection', (socket)=>{
    console.log("new client connected");

    socket.on('joinRoom', ({projectId}) => {
        socket.join(projectId);
        console.log(`User joined project room: ${projectId}`);
    });

    socket.on('chatMessage', async(messageData)=>{
        const {projectId, message, username } = messageData;

        // save the chat message to the database
        const chatMessage = new ChatMessage({projectId, message, username });
        await chatMessage.save();

        // meesage to everyone in the same project room
        io.to(projectId).emit('message', {messsage, username});
    })

    // handle disconnection
    socket.on('disconnect', ()=>{
        console.log("user disconnected");
    });
})



app.use("/auth", require("./routes/authroute"));
app.use("/task" , require("./routes/taskroute"));
app.use("/chat" , require("./routes/chatroute"));


app.listen(port, ()=> console.log(`server is running in ${port}`));