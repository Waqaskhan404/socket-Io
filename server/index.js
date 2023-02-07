const http= require("http");
const express = require("express")
const cors = require("cors")
const socketIo=require("socket.io")

const app=express();
app.use(cors())

const port=4500 || process.env.PORT

app.get("/",(req,res)=>{
    res.send("Hello World");
})


const server=http.createServer(app);

const io=socketIo(server)

io.on("connection",()=>{
    console.log("New Connection")
})

server.listen(port,()=>{
    console.log(`Server is Running on http://localhost:${port}`)
})