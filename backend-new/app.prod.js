"use strict";

var _express = _interopRequireDefault(require("express"));

var _httpErrors = _interopRequireDefault(require("http-errors"));

var _socket = _interopRequireDefault(require("./socket"));

var _cryptoService = _interopRequireDefault(require("./crypto-service"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var morgan = require("morgan");

require("dotenv").config();

var app = (0, _express["default"])();

var _Socket = (0, _socket["default"])(app),
    server = _Socket.server,
    Schedule = _Socket.Schedule;

app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: false
}));
app.use(morgan("dev"));
Schedule(); //sets up the cryto-service for pull and push updates using websockets

app.get("/", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // res.send({ message: "Awesome it works 🐻" });
            res.send("<!DOCTYPE html>\n  <html lang=\"en\">\n  <head>\n      <meta charset=\"UTF-8\">\n      <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n      <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n      <title>Document</title>\n      <script src=\"https://cdn.socket.io/4.4.1/socket.io.min.js\" integrity=\"sha384-fKnu0iswBIqkjxrhQCTZ7qlLHOFEgNkRmK2vaO/LbTZSXdJfAu6ewRBdwHPhBo/H\" crossorigin=\"anonymous\"></script>\n      <script>\n          let socket = io('ws://127.0.0.1:3000');\n          socket.on('message',(data)=>{\n              console.log(data);\n          });\n      </script>\n  </head>\n  <body>\n      <h2>Web Socket...</h2>\n  </body>\n  </html>");

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}());
app.use("/api", require("./routes/api.route"));
app.use(function (req, res, next) {
  next(_httpErrors["default"].NotFound());
});
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send({
    status: err.status || 500,
    message: err.message
  });
});
var PORT = process.env.PORT || 3000;
server.listen(PORT, function () {
  return console.log("\uD83D\uDE80 @ http://localhost:".concat(PORT));
});
