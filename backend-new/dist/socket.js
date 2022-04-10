"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _cryptoService = _interopRequireDefault(require("./crypto-service"));

// const Schedule = CryptoService(io);
var _default = function _default(app) {
  var server = require("http").createServer(app);

  var io = require('socket.io')(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });

  var _CryptoService = (0, _cryptoService["default"])(io),
      Schedule = _CryptoService.Schedule,
      saveExchange = _CryptoService.saveExchange;

  io.on("connection", function (socket) {
    console.log("Client just got connected...");
    socket.on('message', function () {});
    socket.on('save-exchange', function (data) {
      saveExchange(data);
    });
  });
  return {
    server: server,
    io: io,
    Schedule: Schedule,
    saveExchange: saveExchange
  };
};

exports["default"] = _default;