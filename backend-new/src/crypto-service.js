const exchange = require("./models/exchange");
const db = require("./models");
const Exchange = exchange(db.sequelize, db.Sequelize.DataTypes);
const CRYPTO_PULL_INTERVAL = 5;
const ACCESS_KEY = "ab4c6232b8c953d01f1756eb48c62235";
const CRYPTO_URL = `http://api.coinlayer.com/api/live?access_key=${ACCESS_KEY}`;
const TARGET_CURRENCY = "USD";



const fetch = require("node-fetch");

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
  // console.log("Synchronized from crypto-exchange server");
};

const fetchStoredRates = async () => {
  return await Exchange.findAll();
};


export default (io) => {
  const scheduleSync = async () => {
    await fetchAndStoreLatestRates();
    let rates = await fetchStoredRates();
    io.emit("message", rates);
    // console.log(rates);
    setTimeout(scheduleSync, CRYPTO_PULL_INTERVAL * 1000 * 60);
  };

  return {Schedule:scheduleSync,saveExchange:(data)=>{
      console.log(data);
  }};
};
