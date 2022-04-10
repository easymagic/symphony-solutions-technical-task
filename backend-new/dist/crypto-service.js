"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var exchange = require("./models/exchange");

var db = require("./models");

var Exchange = exchange(db.sequelize, db.Sequelize.DataTypes);
var CRYPTO_PULL_INTERVAL = 5;
var ACCESS_KEY = "ab4c6232b8c953d01f1756eb48c62235";
var CRYPTO_URL = "http://api.coinlayer.com/api/live?access_key=".concat(ACCESS_KEY);
var TARGET_CURRENCY = "USD";

var fetch = require("node-fetch");

var fetchAndStoreLatestRates = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var data, crypto, check;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fetch(CRYPTO_URL).then(function (res) {
              return res.json();
            });

          case 2:
            data = _context.sent;
            _context.t0 = _regenerator["default"].keys(data.rates);

          case 4:
            if ((_context.t1 = _context.t0()).done) {
              _context.next = 14;
              break;
            }

            crypto = _context.t1.value;
            _context.next = 8;
            return Exchange.findOne({
              where: {
                crypto: crypto
              }
            });

          case 8:
            check = _context.sent;

            if (!(check == null)) {
              _context.next = 12;
              break;
            }

            _context.next = 12;
            return Exchange.create({
              crypto: crypto,
              currency: TARGET_CURRENCY,
              rate: data.rates[crypto]
            });

          case 12:
            _context.next = 4;
            break;

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function fetchAndStoreLatestRates() {
    return _ref.apply(this, arguments);
  };
}();

var fetchStoredRates = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return Exchange.findAll();

          case 2:
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function fetchStoredRates() {
    return _ref2.apply(this, arguments);
  };
}();

var _default = function _default(io) {
  var scheduleSync = /*#__PURE__*/function () {
    var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3() {
      var rates;
      return _regenerator["default"].wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return fetchAndStoreLatestRates();

            case 2:
              _context3.next = 4;
              return fetchStoredRates();

            case 4:
              rates = _context3.sent;
              io.emit("message", rates); // console.log(rates);

              setTimeout(scheduleSync, CRYPTO_PULL_INTERVAL * 1000 * 60);

            case 7:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function scheduleSync() {
      return _ref3.apply(this, arguments);
    };
  }();

  return {
    Schedule: scheduleSync,
    saveExchange: function saveExchange(data) {
      console.log(data);
    }
  };
};

exports["default"] = _default;