'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _config = require('../../config/config');

var _config2 = _interopRequireDefault(_config);

var _user = require('./services/user');

var userService = _interopRequireWildcard(_user);

var _verify = require('./services/verify');

var verifyService = _interopRequireWildcard(_verify);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tokenSecret = _config2.default.tokenSecret;

/**
 * Register user.
 * @param {koa} ctx
 */
var register = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx) {
    var body, registerUser;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            body = ctx.request.body;

            if (!(!body.username || !body.password)) {
              _context.next = 5;
              break;
            }

            ctx.status = 400;
            ctx.body = {
              error: 'expected an object with username, password but got: ' + body
            };
            return _context.abrupt('return');

          case 5:
            _context.prev = 5;
            _context.next = 8;
            return userService.addNewUser(body.username, body.password);

          case 8:
            registerUser = _context.sent;

            registerUser.password = '******';
            ctx.body = {
              msg: '注册成功',
              user: registerUser
            };
            _context.next = 17;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context['catch'](5);

            ctx.status = 401;
            ctx.body = {
              msg: _context.t0.message
            };

          case 17:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[5, 13]]);
  }));

  return function register(_x) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * Login user.
 * @param {koa} ctx
 */
var login = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(ctx) {
    var body, existUser, token;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            body = ctx.request.body;
            _context2.prev = 1;
            _context2.next = 4;
            return userService.authUser(body.username, body.password);

          case 4:
            existUser = _context2.sent;

            ctx.status = 200;

            existUser.password = '******';
            // 生成 token 返回给客户端
            token = _jsonwebtoken2.default.sign({
              data: existUser
            }, tokenSecret, { expiresIn: '1h' });

            ctx.body = {
              msg: 'Login successful.',
              user: existUser,
              token: token
            };
            _context2.next = 15;
            break;

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2['catch'](1);

            ctx.status = 401;
            ctx.body = {
              msg: _context2.t0.message
            };

          case 15:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[1, 11]]);
  }));

  return function login(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

/**
 * TODO: How to revoke token from koa-jwt.
 * @param {koa.Context} ctx
 */
var logout = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(ctx) {
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            ctx.body = 'Logout successful';

          case 1:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function logout(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

/**
 * Verify email and send verify code to the email.
 * Needn't token.
 * @param {* koa.Context} ctx
 */
var verifyEmail = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(ctx) {
    var email;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            // Verify Email and send validate code to the email.
            email = ctx.request.body.email;
            _context4.prev = 1;
            _context4.next = 4;
            return verifyService.verifyEmail(email);

          case 4:
            ctx.body = {
              msg: 'Send email'
            };
            _context4.next = 11;
            break;

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4['catch'](1);

            ctx.status = 401;
            ctx.body = {
              msg: _context4.t0.message
            };

          case 11:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[1, 7]]);
  }));

  return function verifyEmail(_x4) {
    return _ref4.apply(this, arguments);
  };
}();

/**
 * Verify code which is sent by email.
 * Needn't token.
 * @param {* koa.Context} ctx
 */
var verifyCode = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(ctx) {
    var _ctx$request$body, email, code, token;

    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _ctx$request$body = ctx.request.body, email = _ctx$request$body.email, code = _ctx$request$body.code;
            _context5.prev = 1;
            _context5.next = 4;
            return verifyService.verifyCode(email, code);

          case 4:
            // Generate token, it defferent with login token, the data namespace is different.
            token = _jsonwebtoken2.default.sign({
              changePassword: {
                username: email
              }
            }, tokenSecret, { expiresIn: '1h' });

            ctx.body = {
              msg: 'Verify code successful',
              token: token
            };
            _context5.next = 12;
            break;

          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5['catch'](1);

            ctx.status = 401;
            ctx.body = {
              msg: _context5.t0.message
            };

          case 12:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[1, 8]]);
  }));

  return function verifyCode(_x5) {
    return _ref5.apply(this, arguments);
  };
}();

var changePasswordWithCode = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(ctx) {
    var username, newPassword;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            username = ctx.state.jwtData.changePassword.username;
            newPassword = ctx.request.body.newPassword;
            _context6.prev = 2;
            _context6.next = 5;
            return userService.changePassword(username, newPassword);

          case 5:
            ctx.body = {
              msg: 'Update password successful.'
            };
            _context6.next = 12;
            break;

          case 8:
            _context6.prev = 8;
            _context6.t0 = _context6['catch'](2);

            ctx.status = 401;
            ctx.body = {
              msg: _context6.t0.message
            };

          case 12:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, undefined, [[2, 8]]);
  }));

  return function changePasswordWithCode(_x6) {
    return _ref6.apply(this, arguments);
  };
}();

var changePic = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(ctx) {
    var username, pic;
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            // Update user pic
            username = ctx.state.jwtData.data.username;
            pic = ctx.request.body.pic;
            _context7.prev = 2;
            _context7.next = 5;
            return userService.changePic(username, pic);

          case 5:
            ctx.body = {
              msg: 'Update user picture successful.'
            };
            _context7.next = 12;
            break;

          case 8:
            _context7.prev = 8;
            _context7.t0 = _context7['catch'](2);

            ctx.status = 401;
            ctx.body = {
              msg: _context7.t0.message
            };

          case 12:
          case 'end':
            return _context7.stop();
        }
      }
    }, _callee7, undefined, [[2, 8]]);
  }));

  return function changePic(_x7) {
    return _ref7.apply(this, arguments);
  };
}();

var changeNickname = function () {
  var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(ctx) {
    var username, nickname;
    return _regenerator2.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            username = ctx.state.jwtData.data.username;
            nickname = ctx.request.body.nickname;
            _context8.prev = 2;
            _context8.next = 5;
            return userService.changeNickname(username, nickname);

          case 5:
            ctx.body = {
              msg: 'Update nickname successful.'
            };
            _context8.next = 12;
            break;

          case 8:
            _context8.prev = 8;
            _context8.t0 = _context8['catch'](2);

            ctx.status = 401;
            ctx.body = {
              msg: _context8.t0.message
            };

          case 12:
          case 'end':
            return _context8.stop();
        }
      }
    }, _callee8, undefined, [[2, 8]]);
  }));

  return function changeNickname(_x8) {
    return _ref8.apply(this, arguments);
  };
}();

exports.default = {
  register: register,
  login: login,
  logout: logout,
  verifyCode: verifyCode,
  verifyEmail: verifyEmail,
  changeNickname: changeNickname,
  changePasswordWithCode: changePasswordWithCode,
  changePic: changePic
};