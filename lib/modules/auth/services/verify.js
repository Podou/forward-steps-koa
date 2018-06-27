'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyCode = exports.verifyEmail = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require('../../../utils');

var _verifyCode = require('../models/verifyCode');

var _verifyCode2 = _interopRequireDefault(_verifyCode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var verifyEmail = exports.verifyEmail = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(email) {
    var code, verifyCodeInfo;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (_utils.stringUtils.isEmail(email)) {
              _context.next = 2;
              break;
            }

            throw new Error('Invalid Email');

          case 2:
            _context.prev = 2;
            code = _utils.codeUtils.getSixCode();
            verifyCodeInfo = {
              code: code,
              username: email,
              isUsed: false,
              expiresIn: new Date().getTime() + 3600 * 1000,
              createTime: new Date().getTime()
            };
            _context.next = 7;
            return _verifyCode2.default.update({ isUsed: true }).where({ username: email, isUsed: false });

          case 7:
            _context.next = 9;
            return _verifyCode2.default.create(verifyCodeInfo);

          case 9:
            _utils.emialUtils.sendText(email, 'Change password', 'Code ' + code);
            _context.next = 15;
            break;

          case 12:
            _context.prev = 12;
            _context.t0 = _context['catch'](2);
            throw _context.t0;

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[2, 12]]);
  }));

  return function verifyEmail(_x) {
    return _ref.apply(this, arguments);
  };
}();

var verifyCode = exports.verifyCode = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(email, code) {
    var res;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _verifyCode2.default.findOne({ username: email, code: code, isUsed: false });

          case 3:
            res = _context2.sent;

            if (!(res && !res.isUsed && res.expiresIn >= new Date().getTime())) {
              _context2.next = 9;
              break;
            }

            _context2.next = 7;
            return _verifyCode2.default.update({ isUsed: true }).where({ username: email, isUsed: false });

          case 7:
            _context2.next = 10;
            break;

          case 9:
            throw new Error('Wrong code.');

          case 10:
            _context2.next = 15;
            break;

          case 12:
            _context2.prev = 12;
            _context2.t0 = _context2['catch'](0);
            throw _context2.t0;

          case 15:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 12]]);
  }));

  return function verifyCode(_x2, _x3) {
    return _ref2.apply(this, arguments);
  };
}();