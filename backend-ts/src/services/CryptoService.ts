import db from "../models";
import $exchange from "../models/exchange";
// import fetch from "node-fetch";
import { FetchExchangeRates } from "../apis/FetchExchangeRates";
// import { where } from "sequelize/types";

const Exchange = $exchange(db.sequelize, db.Sequelize.DataTypes);

const INTERVAL = 5; //minutes

export interface ExhangeSchema {
  currency: any;
  crypto: any;
  rate: any;
}

export const SyncCryptoData = async () => {
  let data: ExhangeSchema[] = await FetchExchangeRates();
//   console.log(data);
  for (let i in data) {
    //   console.log(i);
    let { crypto, currency, rate } = data[i];
    let count = await Exchange.count({
      where: {
        "crypto":data[i].crypto,
      },
    });
    if (count <= 0){
      CreateCryptoExchange({crypto,currency,rate});
    }
  }
  return Promise.resolve("done");
};

export const ScheduleSync = async (cb:any)=>{
    await SyncCryptoData();
    let rates:ExhangeSchema[] = await FetchExchangeRates();
    cb(rates);
    setTimeout(ScheduleSync,INTERVAL * 1000 * 60);  
};

export const CreateCryptoExchange =(data:any)=>{
   return Exchange.create(data);
};
