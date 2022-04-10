"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchCryptoExchangeController = void 0;
const mock_crypto_data_1 = require("../mock-crypto-data");
const FetchCryptoExchangeController = (req, res) => {
    res.send({
        data: (0, mock_crypto_data_1.fetchFakerJson)()
    });
};
exports.FetchCryptoExchangeController = FetchCryptoExchangeController;
