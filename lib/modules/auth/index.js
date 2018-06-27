'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _controllers = require('./controllers');

var _controllers2 = _interopRequireDefault(_controllers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const router = new Router({
//   prefix: '/auth',
// });
var prefix = '/auth'; // import Router from 'koa-router';

exports.default = function (router) {
  router.post(prefix + '/login', _controllers2.default.login);
  router.post(prefix + '/logout', _controllers2.default.logout);
  router.post(prefix + '/register', _controllers2.default.register);
  router.post(prefix + '/verifycode', _controllers2.default.verifyCode);
  router.post(prefix + '/verifyemail', _controllers2.default.verifyEmail);
  router.post(prefix + '/changenickname', _controllers2.default.changeNickname);
  router.post(prefix + '/changepassword', _controllers2.default.changePasswordWithCode);
  router.post(prefix + '/changepic', _controllers2.default.changePic);
};