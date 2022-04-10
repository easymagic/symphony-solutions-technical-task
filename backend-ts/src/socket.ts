import { Application } from "express";
import http from "http";
// import $socket from "socket.io";

export const Socket = (app: Application)=>{
    const server = http.createServer(app);
    const io = require('socket.io')(server,{
      cors:{
        origin:"http://localhost:5000",
        methods:["GET","POST"]
    }
    });
    // const {Schedule,saveExchange} = CryptoService(io); 
    
    io.on("connection",(socket:any)=>{
      console.log("Client just got connected...");
      socket.on('message',()=>{         
      });
      socket.on('save-exchange',(data:any)=>{
          console.log(data);
      });
    }); 
    return {server,io};   
    // return {server,io,Schedule,saveExchange};   
};