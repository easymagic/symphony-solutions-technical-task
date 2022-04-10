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
exports.DEFAULT_CURRENCY_TO = exports.TYPE_SAVED_EXCHANGE = exports.TYPE_LIVE_PRICE = void 0;
const models_1 = __importDefault(require("../models"));
const currencyexchange_1 = __importDefault(require("../models/currencyexchange"));
const CurrencyExchange = (0, currencyexchange_1.default)(models_1.default.sequelize, models_1.default.Sequelize.DataTypes);
exports.TYPE_LIVE_PRICE = "Live Price";
exports.TYPE_SAVED_EXCHANGE = "Exchanged";
exports.DEFAULT_CURRENCY_TO = "USD";
class CurrencyExchangeService {
    static fetch(type) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield CurrencyExchange.findAll({
                where: {
                    type: type,
                },
            });
        });
    }
    static create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            data.date_and_time = new Date().toString();
            return yield CurrencyExchange.create(data);
        });
    }
    static cryptoExists(crypto) {
        return __awaiter(this, void 0, void 0, function* () {
            let count = yield CurrencyExchange.count({
                where: {
                    currency_from: crypto,
                },
            });
            return Promise.resolve(count > 0);
        });
    }
    static countAll(type = exports.TYPE_LIVE_PRICE) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield CurrencyExchange.count({
                where: {
                    'type': type
                }
            });
        });
    }
    static update(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            yield CurrencyExchange.update(data, {
                where: {
                    id: id,
                },
            });
        });
    }
    static createIfNotExists(data) {
        return __awaiter(this, void 0, void 0, function* () {
            let check = yield this.cryptoExists(data.currency_from);
            if (!check) {
                yield this.create(data);
            }
            return Promise.resolve("created");
        });
    }
    static getEstimatedConversion(currencyFrom, currencyTo, amount1) {
        return __awaiter(this, void 0, void 0, function* () {
            let record = yield CurrencyExchange.findOne({
                where: {
                    currency_from: currencyFrom,
                    type: exports.TYPE_LIVE_PRICE,
                    currency_to: exports.DEFAULT_CURRENCY_TO,
                },
            });
            if (record) {
                return Promise.resolve(+amount1 * record.amount1);
            }
            return Promise.resolve(0);
        });
    }
}
exports.default = CurrencyExchangeService;
