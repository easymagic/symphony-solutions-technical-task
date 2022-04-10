import express, { Application, Request, Response, NextFunction } from "express";
import { Socket } from "./socket";
import { FetchCryptoExchangeController } from "./controllers/FetchCryptoExchangeController";
import { ScheduleSync } from "./services/CryptoService";
import CurrencyExchangeService, {
  TYPE_SAVED_EXCHANGE,
} from "./services/CurrencyExchangeService";

const app: Application = express();

export const PORT_SOCKET_CLIENT = 5000;
const PORT = 5000; 

const { server, io } = Socket(app); //initialize the socket server

ScheduleSync(async (data: any) => {
  io.emit("fetch-live-exchange", data);
  let savedExchange = await CurrencyExchangeService.fetch(TYPE_SAVED_EXCHANGE);
  io.emit("fetch-saved-exchange", savedExchange);
});

// console.log(fetchFakerJson());

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  let count = await CurrencyExchangeService.countAll();
  res.send({
    version: "1.0.0",
    message: "Crypto exchange server",
    info: `${count} crypto exchange rates`,
  });
});

app.get("/crypto-exchanges", FetchCryptoExchangeController);

app.get("/socket-test", (req: Request, res: Response) => {
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
