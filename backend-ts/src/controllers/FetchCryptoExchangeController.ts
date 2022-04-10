import { Application , Request , Response } from "express";
import { fetchFakerJson } from "../mock-crypto-data";

export const FetchCryptoExchangeController = (req : Request , res:Response)=>{
   res.send({
       data:fetchFakerJson()
   });    
};