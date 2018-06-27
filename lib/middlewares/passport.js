'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _koaPassport = require('koa-passport');

var _koaPassport2 = _interopRequireDefault(_koaPassport);

var _passportLocal = require('passport-local');

var _passportLocal2 = _interopRequireDefault(_passportLocal);

var _log4js = require('log4js');

var _log4js2 = _interopRequireDefault(_log4js);

var _services = require('../services');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logger = _log4js2.default.getLogger();

_koaPassport2.default.use(new _passportLocal2.default.Strategy(function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(username, password, done) {
    var existUser;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            logger.debug('Passport LocalStrategy', username, password);
            _context.next = 3;
            return _services.userService.authUser(username, password);

          case 3:
            existUser = _context.sent;

            if (!existUser) {
              _context.next = 6;
              break;
            }

            return _context.abrupt('return', done(null, existUser, 'Login successful'));

          case 6:
            return _context.abrupt('return', done(null, false, 'Username or password is wrong'));

          case 7:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}()));

// serializeUser 在用户登录验证成功以后将会把用户的数据存储到 session 中
_koaPassport2.default.serializeUser(function (user, done) {
  logger.debug('Passport SerializeUser', user);
  done(null, user);
});

// deserializeUser 在每次请求的时候将从 session 中读取用户对象
_koaPassport2.default.deserializeUser(function (user, done) {
  logger.debug('Passport DeserializeUser', user);
  return done(null, user);
});

exports.default = _koaPassport2.default;