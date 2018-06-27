'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * 映射 d 文件夹下的文件为模块
 */
var mapDir = function mapDir(d) {
  var tree = {};
  // 获得当前文件夹下的所有的文件夹和文件

  var _$partition = (0, _lodash2.default)(_fs2.default.readdirSync(d)).partition(function (p) {
    _fs2.default.statSync(_path2.default.join(d, p)).isDirectory();
  }),
      _$partition2 = (0, _slicedToArray3.default)(_$partition, 2),
      dirs = _$partition2[0],
      files = _$partition2[1];

  // 映射文件夹


  dirs.forEach(function (dir) {
    tree[dir] = mapDir(_path2.default.join(d, dir));
  });

  // 映射文件
  files.forEach(function (file) {
    var moduleFolder = _path2.default.join(d, file);
    if (_fs2.default.statSync(moduleFolder).isDirectory()) {
      // eslint-disable-next-line
      tree[_path2.default.basename(file, '.js')] = require(moduleFolder + '/index.js').default;
    }
  });
  return tree;
};

exports.default = mapDir(__dirname);