"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchFakerJson = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const fetchFakerJson = () => {
    let data = (0, fs_1.readFileSync)(path_1.default.join(__dirname, "..", "mock-crypto-data", "Exchanges.json"), "utf8");
    return JSON.parse(data)[2]['data'];
};
exports.fetchFakerJson = fetchFakerJson;
