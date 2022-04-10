// const Schedule = CryptoService(io);
import CryptoService from "./crypto-service";

export default (app)=>{
    const server = require("http").createServer(app);
    const io = require('socket.io')(server,{
      cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"]
    }
    });
    const {Schedule,saveExchange} = CryptoService(io); 
    
    io.on("connection",(socket)=>{
      console.log("Client just got connected...");
      socket.on('message',()=>{         
      });
      socket.on('save-exchange',(data)=>{
          saveExchange(data);
      });
    }); 
    
    return {server,io,Schedule,saveExchange};   
};