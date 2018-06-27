'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _log4js = require('log4js');

var _log4js2 = _interopRequireDefault(_log4js);

var _config = require('../config/config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logger = _log4js2.default.getLogger();
var UnAuthUrls = ['/login', '/logout', '/registry'];
var authenticate = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx, next) {
    var requestUrl;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            requestUrl = ctx.request.url;

            logger.debug('Request', ctx.request.method, requestUrl);

            if (!_config.supportAuth) {
              _context.next = 11;
              break;
            }

            if (!(ctx.isAuthenticated() || UnAuthUrls.indexOf(requestUrl) !== -1)) {
              _context.next = 8;
              break;
            }

            _context.next = 6;
            return next();

          case 6:
            _context.next = 9;
            break;

          case 8:
            if (ctx.isUnauthenticated()) {
              ctx.body = '用户未登陆，请先登录！';
            }

          case 9:
            _context.next = 13;
            break;

          case 11:
            _context.next = 13;
            return next();

          case 13:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function authenticate(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
exports.default = authenticate;