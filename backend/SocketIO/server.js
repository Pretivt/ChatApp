
import {Server} from "socket.io";
import http from"http";
import express from"express";
const app= express();

const server = http.createServer(app);
const io=new Server(server,{
    cors:{
        origin:"http://localhost:3001",
        methods:["Get","Post"],
    }
});

//realtime message code goes here
const users = {};

export const getReceiverSocketId=(receiverId)=>{
    return users[receiverId];
}

//used to listen events on server side
io.on("connection",(socket)=>{
    console.log("a user connected",socket.id);
    const userId=socket.handshake.query.userId;
    if(userId){
        users[userId]= socket.id;
        console.log("hello",users);
    }

    //used to send the emails to all connected users
    io.emit("getOnlineUsers", Object.keys(users));
    
//used to listen client side events on server side&client
    socket.on("disconnect",()=>{
        console.log("a user disconnected",socket.id);
        delete  users[userId];
        io.emit("getOnlineUsers", Object.keys(users));
    });


    //typing indicator events
    // socket.on('typing',(roomId)=>{
    //     socket.to(roomId).emit('typing');
    // })

    // socket.on('stopTyping',(roomId)=>{
    //     socket.to(roomId).emit('stopTyping');
    // });
    // //Room join event
    // socket.on('joinRoom',(roomId)=>{
    //     socket.join(roomId);
    //     console.log(`User ${socket.id} joined room ${roomId}`);
    // });
    socket.on('disconnect',()=>{
        console.log('A user disconnected:',socket.id);
    });
});


export{app,io,server,}