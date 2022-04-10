import fs,{readFileSync} from "fs";
import path from "path";

export const fetchFakerJson =()=>{
   let data = readFileSync(path.join(__dirname,"..","mock-crypto-data", "Exchanges.json"),"utf8");
   return JSON.parse(data)[2]['data'];
};
