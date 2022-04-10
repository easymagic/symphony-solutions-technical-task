import express, { Application, Request, Response, NextFunction } from "express";
import { Socket } from "./socket";
import { FetchCryptoExchangeController } from "./controllers/FetchCryptoExchangeController";
import { ScheduleSync } from "./services/CryptoService";
import CurrencyExchangeService from "./services/CurrencyExchangeService";

const app: Application = express();

const { server, io } = Socket(app); //initialize the socket server

ScheduleSync((data: any) => {
  io.emit("message", data);
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
