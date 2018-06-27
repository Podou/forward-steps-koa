'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveFileByFileSystem = exports.existFolder = undefined;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = _bluebird2.default.promisifyAll(require('fs'));

var existFolder = exports.existFolder = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(folderPath) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return fs.exists(folderPath);

          case 2:
            if (_context.sent) {
              _context.next = 5;
              break;
            }

            _context.next = 5;
            return fs.mkdir(folderPath);

          case 5:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function existFolder(_x) {
    return _ref.apply(this, arguments);
  };
}();

var saveFileByFileSystem = exports.saveFileByFileSystem = function saveFileByFileSystem(file, savePath, filename) {
  var saveTo = _path2.default.join(savePath, filename);
  file.pipe(fs.createWriteStream(saveTo));
};