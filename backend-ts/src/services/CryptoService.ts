import db from "../models";
import $currencyexchange from "../models/currencyexchange";

import { FetchExchangeRates } from "../apis/FetchExchangeRates";

import CurrencyExchangeService, {
  CurrencyExchangeSchema,
  TYPE_LIVE_PRICE,
} from "./CurrencyExchangeService";

const INTERVAL = 5; //minutes

export interface ExhangeSchema {
  currency: string;
  crypto: string;
  rate: string;
}

export const SyncCryptoData = async () => {
  let data: ExhangeSchema[] = await FetchExchangeRates();
  for (let i in data) {
    await CurrencyExchangeService.createIfNotExists({
      currency_from: data[i].crypto,
      amount1: data[i].rate,
      currency_to: data[i].currency,
      type: TYPE_LIVE_PRICE,
      amount2: "",
    });
  }
  return Promise.resolve("done");
};

export const ScheduleSync = async (cb: any) => {
  let $fn = async () => {
    await SyncCryptoData();
    let rates: CurrencyExchangeSchema[] = await CurrencyExchangeService.fetch(
      TYPE_LIVE_PRICE
    );
    cb(rates);
    setTimeout($fn, INTERVAL * 1000 * 60);
  };
  $fn();
};
