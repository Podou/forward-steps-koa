'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.changePic = exports.changeNickname = exports.changePassword = exports.updateNickname = exports.authUser = exports.addNewUser = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _user = require('../models/user');

var _user2 = _interopRequireDefault(_user);

var _utils = require('../../../utils');

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create new User:
 * 1. Create new user with username and password
 * 2. Init nickname with ''
 */
var addNewUser = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(username, password) {
    var queryUser, existUser, userInfo;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(!username || !password)) {
              _context.next = 2;
              break;
            }

            throw new Error('Username or password must be not null.');

          case 2:
            if (utils.stringUtils.isEmail(username)) {
              _context.next = 4;
              break;
            }

            throw new Error('Username must be email.');

          case 4:
            if (utils.stringUtils.isPassword(password)) {
              _context.next = 6;
              break;
            }

            throw new Error('Password\'s length must be bigger than or equal 6.');

          case 6:
            queryUser = { username: username };
            _context.next = 9;
            return _user2.default.findOne(queryUser);

          case 9:
            existUser = _context.sent;

            if (!existUser) {
              _context.next = 12;
              break;
            }

            throw new Error('User exists.');

          case 12:
            _context.prev = 12;
            userInfo = {
              username: username,
              password: utils.getPassword(password),
              createTime: new Date().getTime(),
              updateTime: new Date().getTime()
            };
            _context.next = 16;
            return _user2.default.create(userInfo);

          case 16:
            return _context.abrupt('return', _context.sent);

          case 19:
            _context.prev = 19;
            _context.t0 = _context['catch'](12);
            throw _context.t0;

          case 22:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[12, 19]]);
  }));

  return function addNewUser(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * User login
 * @param {*string} username
 * @param {*string} password
 */
var authUser = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(username, password) {
    var existUser;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return _user2.default.findOne({
              username: username,
              password: utils.getPassword(password)
            });

          case 3:
            existUser = _context2.sent;

            if (existUser) {
              _context2.next = 6;
              break;
            }

            throw new Error('Username or password is not valid.');

          case 6:
            return _context2.abrupt('return', existUser);

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2['catch'](0);
            throw _context2.t0;

          case 12:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 9]]);
  }));

  return function authUser(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var updateNickname = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(username, nickname) {
    var queryUser, existUser;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!(!username || !nickname)) {
              _context3.next = 2;
              break;
            }

            throw new Error('Username or nickname must be not null.');

          case 2:

            // Username must exist.
            queryUser = { username: username };
            _context3.next = 5;
            return _user2.default.findOne(queryUser);

          case 5:
            existUser = _context3.sent;

            if (!existUser) {
              _context3.next = 8;
              break;
            }

            throw new Error('User exists.');

          case 8:
            _context3.prev = 8;
            _context3.next = 11;
            return _user2.default.update(queryUser);

          case 11:
            _context3.next = 16;
            break;

          case 13:
            _context3.prev = 13;
            _context3.t0 = _context3['catch'](8);
            throw _context3.t0;

          case 16:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[8, 13]]);
  }));

  return function updateNickname(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var changePassword = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(email, newPassword) {
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (utils.stringUtils.isEmail(email)) {
              _context4.next = 2;
              break;
            }

            throw new Error('Wrong username');

          case 2:
            if (utils.stringUtils.isPassword(newPassword)) {
              _context4.next = 4;
              break;
            }

            throw new Error('Password\'s length must be bigger than or equal 6.');

          case 4:
            _context4.prev = 4;
            _context4.next = 7;
            return _user2.default.update({ password: utils.getPassword(newPassword) }).where({ username: email });

          case 7:
            _context4.next = 12;
            break;

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4['catch'](4);
            throw _context4.t0;

          case 12:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[4, 9]]);
  }));

  return function changePassword(_x7, _x8) {
    return _ref4.apply(this, arguments);
  };
}();

var changeNickname = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(username, nickname) {
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (utils.stringUtils.isEmail(username)) {
              _context5.next = 2;
              break;
            }

            throw new Error('Wrong username');

          case 2:
            if (nickname) {
              _context5.next = 4;
              break;
            }

            throw new Error('Nickname can\'t be null');

          case 4:
            _context5.prev = 4;
            _context5.next = 7;
            return _user2.default.update({ nickname: nickname }).where({ username: username });

          case 7:
            _context5.next = 12;
            break;

          case 9:
            _context5.prev = 9;
            _context5.t0 = _context5['catch'](4);
            throw _context5.t0;

          case 12:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[4, 9]]);
  }));

  return function changeNickname(_x9, _x10) {
    return _ref5.apply(this, arguments);
  };
}();

var changePic = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(username, pic) {
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            if (utils.stringUtils.isEmail(username)) {
              _context6.next = 2;
              break;
            }

            throw new Error('Wrong username');

          case 2:
            if (pic) {
              _context6.next = 4;
              break;
            }

            throw new Error('Username pic can\'t be null');

          case 4:
            _context6.prev = 4;
            _context6.next = 7;
            return _user2.default.update({ pic: pic }).where({ username: username });

          case 7:
            _context6.next = 12;
            break;

          case 9:
            _context6.prev = 9;
            _context6.t0 = _context6['catch'](4);
            throw _context6.t0;

          case 12:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined, [[4, 9]]);
  }));

  return function changePic(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

exports.addNewUser = addNewUser;
exports.authUser = authUser;
exports.updateNickname = updateNickname;
exports.changePassword = changePassword;
exports.changeNickname = changeNickname;
exports.changePic = changePic;