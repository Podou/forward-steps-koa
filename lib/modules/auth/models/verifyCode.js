'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var VerifyCodeSchema = new _mongoose.Schema({
  code: String,
  username: String,
  isUsed: Boolean,
  createDate: String,
  expiresIn: Number
});

exports.default = _mongoose2.default.model('VerifyCode', VerifyCodeSchema, 'verifyCode');