"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.PORT_SOCKET_CLIENT = void 0;
const express_1 = __importDefault(require("express"));
const socket_1 = require("./socket");
const FetchCryptoExchangeController_1 = require("./controllers/FetchCryptoExchangeController");
const CryptoService_1 = require("./services/CryptoService");
const CurrencyExchangeService_1 = __importStar(require("./services/CurrencyExchangeService"));
const app = (0, express_1.default)();
exports.PORT_SOCKET_CLIENT = 5000;
const PORT = 5000;
const { server, io } = (0, socket_1.Socket)(app); //initialize the socket server
(0, CryptoService_1.ScheduleSync)((data) => __awaiter(void 0, void 0, void 0, function* () {
    io.emit("fetch-live-exchange", data);
    let savedExchange = yield CurrencyExchangeService_1.default.fetch(CurrencyExchangeService_1.TYPE_SAVED_EXCHANGE);
    io.emit("fetch-saved-exchange", savedExchange);
}));
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
            socket.on('fetch-live-exchange',(data)=>{
                console.log('live-exchange',data);
            });
            socket.on('fetch-saved-exchange',(data)=>{
                console.log('saved-exchange',data);
            });
        </script>
    </head>
    <body>
        <h2>Web Socket...</h2>
    </body>
    </html>`);
});
server.listen(PORT, () => console.log(`Socket server running on port ${PORT}`));
//
