import { Application } from "express";
import http from "http";
import { PORT_SOCKET_CLIENT } from "./app";
import CurrencyExchangeService, {
  CurrencyExchangeSchema,
  TYPE_SAVED_EXCHANGE,
} from "./services/CurrencyExchangeService";
// import $socket from "socket.io";

export const Socket = (app: Application) => {
  const server = http.createServer(app);
  const io = require("socket.io")(server, {
    cors: {
      origin: `http://localhost:${PORT_SOCKET_CLIENT}`,
      methods: ["GET", "POST"],
    },
  });
  // const {Schedule,saveExchange} = CryptoService(io);

  io.on("connection", (socket: any) => {
    console.log("Client just got connected...");
    socket.on("message", () => {});
    socket.on("save-exchange", async (data: CurrencyExchangeSchema) => {
      console.log(data);
      await CurrencyExchangeService.create({
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
      let saveExhangeList = await CurrencyExchangeService.fetch(TYPE_SAVED_EXCHANGE);
      io.emit("fetch-saved-exchange",saveExhangeList);
    });
    
    socket.on("sort", async (filters:any)=>{
      let sortedRecords = await CurrencyExchangeService.sortAndFilter(
        filters.dateFilter,
        filters.sortField,
        filters.sortOrder
      );
      io.emit("fetch-saved-exchange",sortedRecords);
    });
  });
  return { server, io };
  // return {server,io,Schedule,saveExchange};
};
