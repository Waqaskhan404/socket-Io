const http= require("http");
const express = require("express")
const cors = require("cors")
const socketIo=require("socket.io")

const app=express();

const users=[{}];
app.use(cors())

const port=4500 || process.env.PORT

app.get("/",(req,res)=>{
    res.send("Hello World");
})


const server=http.createServer(app);

const io=socketIo(server)

io.on("connection",(socket)=>{
    console.log("New Connection")

    socket.on("joined",({user})=>{
        users[socket.id]=user
        console.log(`${user} has Joined`)
    socket.broadcast.emit("userJoined",{user:"Admin",message:`${users[socket.id]} Has joined`})
    socket.emit("welcome",{user:"Admin",message:`Welcome To the chat ${users[socket.id]}`})
    })

    socket.on("message",({message,id})=>{
        io.emit('sendMessage',{user:users[id],message,id})

      });

      
    socket.on('disconnect', () => {
        socket.broadcast.emit("leave",{user:"Admin",message:`${users[socket.id]} Has Left`})
        console.log('user disconnected');
      });
      
})


server.listen(port,()=>{
    console.log(`Server is Running on http://localhost:${port}`)
})