import express from "express";
import createError from "http-errors";
import Socket from "./socket";
import CryptoService from "./crypto-service";

const morgan = require("morgan");
require("dotenv").config();

const app = express();
const { server , Schedule } = Socket(app);


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

Schedule();//sets up the cryto-service for pull and push updates using websockets

app.get("/", async (req, res, next) => {
  // res.send({ message: "Awesome it works 🐻" });
  res.send(`<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <script src="https://cdn.socket.io/4.4.1/socket.io.min.js" integrity="sha384-fKnu0iswBIqkjxrhQCTZ7qlLHOFEgNkRmK2vaO/LbTZSXdJfAu6ewRBdwHPhBo/H" crossorigin="anonymous"></script>
      <script>
          let socket = io('ws://127.0.0.1:3000');
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

app.use("/api", require("./routes/api.route"));

app.use((req, res, next) => {
  next(createError.NotFound());
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message,
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
