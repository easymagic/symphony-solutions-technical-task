"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCryptoExchange = exports.ScheduleSync = exports.SyncCryptoData = void 0;
const models_1 = __importDefault(require("../models"));
const exchange_1 = __importDefault(require("../models/exchange"));
const FetchExchangeRates_1 = require("../apis/FetchExchangeRates");
const Exchange = (0, exchange_1.default)(models_1.default.sequelize, models_1.default.Sequelize.DataTypes);
const INTERVAL = 5; //minutes
const SyncCryptoData = () => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield (0, FetchExchangeRates_1.FetchExchangeRates)();
    //   console.log(data);
    for (let i in data) {
        //   console.log(i);
        let { crypto, currency, rate } = data[i];
        let count = yield Exchange.count({
            where: {
                "crypto": data[i].crypto,
            },
        });
        if (count <= 0) {
            (0, exports.CreateCryptoExchange)({ crypto, currency, rate });
        }
    }
    return Promise.resolve("done");
});
exports.SyncCryptoData = SyncCryptoData;
const ScheduleSync = (cb) => __awaiter(void 0, void 0, void 0, function* () {
    let $fn = () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, exports.SyncCryptoData)();
        let rates = yield (0, FetchExchangeRates_1.FetchExchangeRates)();
        cb(rates);
        setTimeout($fn, INTERVAL * 1000 * 60);
    });
    $fn();
});
exports.ScheduleSync = ScheduleSync;
const CreateCryptoExchange = (data) => {
    return Exchange.create(data);
};
exports.CreateCryptoExchange = CreateCryptoExchange;
