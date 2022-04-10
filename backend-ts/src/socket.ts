import { Application } from "express";
import http from "http";
import CurrencyExchangeService, {
  CurrencyExchangeSchema,
  TYPE_SAVED_EXCHANGE,
} from "./services/CurrencyExchangeService";
// import $socket from "socket.io";

export const Socket = (app: Application) => {
  const server = http.createServer(app);
  const io = require("socket.io")(server, {
    cors: {
      origin: "http://localhost:5000",
      methods: ["GET", "POST"],
    },
  });
  // const {Schedule,saveExchange} = CryptoService(io);

  io.on("connection", (socket: any) => {
    console.log("Client just got connected...");
    socket.on("message", () => {});
    socket.on("save-exchange", async (data: CurrencyExchangeSchema) => {
      console.log(data);
      CurrencyExchangeService.create({
        currency_from: data.currency_from,
        amount1: data.amount1,
        currency_to: data.currency_to,
        amount2: await CurrencyExchangeService.getEstimatedConversion(
          data.currency_from,
          data.currency_to,
          data.amount1
        ),
        type: TYPE_SAVED_EXCHANGE,
      });
    });
  });
  return { server, io };
  // return {server,io,Schedule,saveExchange};
};
