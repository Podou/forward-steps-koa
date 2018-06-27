'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSixCode = exports.getUuid = undefined;

var _v = require('uuid/v1');

var _v2 = _interopRequireDefault(_v);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getUuid = exports.getUuid = function getUuid() {
  return (0, _v2.default)();
};

var getSixCode = exports.getSixCode = function getSixCode() {
  var num = '';
  /* eslint-disable no-plusplus */
  for (var i = 0; i < 6; i++) {
    num += Math.floor(Math.random() * 10);
  }
  return num;
};