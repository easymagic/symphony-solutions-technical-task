"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Socket = void 0;
const http_1 = __importDefault(require("http"));
// import $socket from "socket.io";
const Socket = (app) => {
    const server = http_1.default.createServer(app);
    const io = require('socket.io')(server, {
        cors: {
            origin: "http://localhost:5000",
            methods: ["GET", "POST"]
        }
    });
    // const {Schedule,saveExchange} = CryptoService(io); 
    io.on("connection", (socket) => {
        console.log("Client just got connected...");
        socket.on('message', () => {
        });
        socket.on('save-exchange', (data) => {
            console.log(data);
        });
    });
    return { server, io };
    // return {server,io,Schedule,saveExchange};   
};
exports.Socket = Socket;
