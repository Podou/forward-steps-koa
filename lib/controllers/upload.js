'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _log4js = require('log4js');

var _log4js2 = _interopRequireDefault(_log4js);

var _busboy = require('busboy');

var _busboy2 = _interopRequireDefault(_busboy);

var _config = require('../config/config');

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logger = _log4js2.default.getLogger();
// import uploadConfig from '../config/uploadConfig';

exports.default = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx) {
    var request;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            request = ctx.req;
            _context.next = 3;
            return _utils.fileUtils.existFolder(_config.upload.savePath);

          case 3:
            return _context.abrupt('return', new _promise2.default(function (resolve) {
              var files = [];
              // Use busboy to handle upload file
              var busboy = new _busboy2.default({ headers: request.headers });
              busboy.on('file', function (fieldname, file, filename) {
                // Generate UUID filename
                var saveFilename = _utils.codeUtils.getUuid();
                // Save file
                saveFilename = '' + saveFilename + filename.substring(filename.lastIndexOf('.'), filename.length);
                _utils.fileUtils.saveFileByFileSystem(file, _config.upload.savePath, saveFilename);
                logger.debug('Upload file', filename, '. Rename', saveFilename);

                // Support multpart files.
                files.push({
                  fileUrl: _config.upload.urlPath + '/' + saveFilename,
                  filename: filename,
                  fieldname: fieldname
                });
              });

              busboy.on('finish', function () {
                ctx.body = files;
                // Must add resolve function to finish Promise.
                resolve();
              });
              request.pipe(busboy);
            }));

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
}();