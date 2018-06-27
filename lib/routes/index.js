'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _log4js = require('log4js');

var _log4js2 = _interopRequireDefault(_log4js);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _controllers = require('../controllers');

var _controllers2 = _interopRequireDefault(_controllers);

var _modules = require('../modules');

var _modules2 = _interopRequireDefault(_modules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logger = _log4js2.default.getLogger();

var router = new _koaRouter2.default();
router.get('/user', _controllers2.default.user.get);
router.post('/upload', _controllers2.default.upload);

/**
 * Init all routes from modules.
 */
_lodash2.default.forEach(_modules2.default, function (value) {
  if (typeof value === 'function') {
    value(router);
  }
});

logger.info('Initialize router successful');
exports.default = router;