const express = require("express");
const createError = require("http-errors");
const morgan = require("morgan");
require("dotenv").config();

const db = require("./models");
const fetch = require("node-fetch");

const exchange = require("./models/exchange");
const Exchange = exchange(db.sequelize, db.Sequelize.DataTypes);
const CRYPTO_PULL_INTERVAL = 5;
const ACCESS_KEY = "ab4c6232b8c953d01f1756eb48c62235";
const CRYPTO_URL = `http://api.coinlayer.com/api/live?access_key=${ACCESS_KEY}`;
const TARGET_CURRENCY = "USD";

const app = express();

const server = require('http').createServer(app);
const WebSocket = require('ws');

const wwebSocketServer = new WebSocket.Server({server});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));

const fetchAndStoreLatestRates = async () => {
  let data = await fetch(CRYPTO_URL).then((res) => res.json());
  for (let crypto in data.rates) {
    let check = await Exchange.findOne({ where: { crypto } });

    if (check == null) {
      await Exchange.create({
        crypto,
        currency: TARGET_CURRENCY,
        rate: data.rates[crypto],
      });
    }
  }
  console.log("Synchronized from crypto-exchange server");
};

const fetchStoredRates = async () => {
  return await Exchange.findAll();
};

const scheduleSync = async () => {
  await fetchAndStoreLatestRates();
  let rates = await fetchStoredRates();
  // console.log(rates);
  setTimeout(scheduleSync, CRYPTO_PULL_INTERVAL * 1000 * 60);
};

scheduleSync();

app.get("/", async (req, res, next) => {
  res.send({ message: "Awesome it works 🐻" });
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
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
