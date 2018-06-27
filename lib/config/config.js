'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _constants = require('../../config/constants.json');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Upload file settings.
var upload = {
  savePath: _path2.default.join(process.cwd(), 'static', 'file'),
  urlPath: 'file'
};

exports.default = (0, _extends3.default)({
  upload: upload
}, _constants2.default);