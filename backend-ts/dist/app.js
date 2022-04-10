"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_1 = require("./socket");
const FetchCryptoExchangeController_1 = require("./controllers/FetchCryptoExchangeController");
const CryptoService_1 = require("./services/CryptoService");
const CurrencyExchangeService_1 = __importDefault(require("./services/CurrencyExchangeService"));
const app = (0, express_1.default)();
const { server, io } = (0, socket_1.Socket)(app); //initialize the socket server
(0, CryptoService_1.ScheduleSync)((data) => {
    io.emit("message", data);
});
// console.log(fetchFakerJson());
app.get("/", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let count = yield CurrencyExchangeService_1.default.countAll();
    res.send({
        version: "1.0.0",
        message: "Crypto exchange server",
        info: `${count} crypto exchange rates`,
    });
}));
app.get("/crypto-exchanges", FetchCryptoExchangeController_1.FetchCryptoExchangeController);
app.get("/socket-test", (req, res) => {
    res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        <script src="https://cdn.socket.io/4.4.1/socket.io.min.js" integrity="sha384-fKnu0iswBIqkjxrhQCTZ7qlLHOFEgNkRmK2vaO/LbTZSXdJfAu6ewRBdwHPhBo/H" crossorigin="anonymous"></script>
        <script>
            let socket = io('ws://127.0.0.1:5000');
            socket.on('message',(data)=>{
                console.log(data);
            });
        </script>
    </head>
    <body>
        <h2>Web Socket...</h2>
    </body>
    </html>`);
});
server.listen(5000, () => console.log("Socket server running on port 5000"));
//
