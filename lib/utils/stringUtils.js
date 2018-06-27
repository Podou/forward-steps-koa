'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPassword = exports.isIpv4 = exports.isEmail = undefined;

var _is_js = require('is_js');

var _is_js2 = _interopRequireDefault(_is_js);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isEmail = exports.isEmail = function isEmail(text) {
  return _is_js2.default.email(text);
};

var isIpv4 = exports.isIpv4 = function isIpv4(text) {
  return _is_js2.default.ipv4(text);
};

var isPassword = exports.isPassword = function isPassword(text) {
  return text && text.length >= 6 && text.length <= 20;
};