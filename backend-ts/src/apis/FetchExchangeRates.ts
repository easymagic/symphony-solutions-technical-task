import { ExhangeSchema } from "../services/CryptoService";
const fetch = require('node-fetch');

export const FetchExchangeRates = async ():Promise<any>=>{
   return await fetch("http://localhost:5000/crypto-exchanges").then((res:any)=>res.json()).then((res:any)=>res.data);
};