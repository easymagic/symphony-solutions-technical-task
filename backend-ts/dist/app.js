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
const express_1 = __importDefault(require("express"));
const exchange_1 = __importDefault(require("./models/exchange"));
const models_1 = __importDefault(require("./models"));
const app = (0, express_1.default)();
const Exchange = (0, exchange_1.default)(models_1.default.sequelize, models_1.default.Sequelize.DataTypes);
app.get('/', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield Exchange.findAll();
    res.send({
        version: '1.0.0',
        message: 'Crypto exchange server',
        data
    });
}));
app.listen(5000, () => console.log('Socket server running on port 5000'));
//
