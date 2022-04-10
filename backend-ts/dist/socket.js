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
exports.Socket = void 0;
const http_1 = __importDefault(require("http"));
const CurrencyExchangeService_1 = __importStar(require("./services/CurrencyExchangeService"));
// import $socket from "socket.io";
const Socket = (app) => {
    const server = http_1.default.createServer(app);
    const io = require("socket.io")(server, {
        cors: {
            origin: "http://localhost:5000",
            methods: ["GET", "POST"],
        },
    });
    // const {Schedule,saveExchange} = CryptoService(io);
    io.on("connection", (socket) => {
        console.log("Client just got connected...");
        socket.on("message", () => { });
        socket.on("save-exchange", (data) => __awaiter(void 0, void 0, void 0, function* () {
            console.log(data);
            CurrencyExchangeService_1.default.create({
                currency_from: data.currency_from,
                amount1: data.amount1,
                currency_to: data.currency_to,
                amount2: yield CurrencyExchangeService_1.default.getEstimatedConversion(data.currency_from, data.currency_to, data.amount1),
                type: CurrencyExchangeService_1.TYPE_SAVED_EXCHANGE,
            });
        }));
    });
    return { server, io };
    // return {server,io,Schedule,saveExchange};
};
exports.Socket = Socket;
