'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _crypto = require('crypto');

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (text) {
  var md5Text = _crypto2.default.createHash('md5').update(text, 'utf8').digest('hex');
  return _crypto2.default.createHash('sha1').update(md5Text, 'utf8').digest('hex');
};