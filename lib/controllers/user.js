"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tt = exports.get = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import log4js from 'log4js';
// import { userService } from '../services';

// const logger = log4js.getLogger();

var get = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx) {
    var userInfo;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            // logger.info('Get userInfo, passport session:', ctx.state.user);
            userInfo = ctx.state.jwtData.data;

            ctx.body = userInfo;

          case 2:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function get(_x) {
    return _ref.apply(this, arguments);
  };
}();

var tt = 0;
exports.get = get;
exports.tt = tt;