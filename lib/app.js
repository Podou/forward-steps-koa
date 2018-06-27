'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _koaBodyparser = require('koa-bodyparser');

var _koaBodyparser2 = _interopRequireDefault(_koaBodyparser);

var _koaConvert = require('koa-convert');

var _koaConvert2 = _interopRequireDefault(_koaConvert);

var _koaJson = require('koa-json');

var _koaJson2 = _interopRequireDefault(_koaJson);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _httpProxyMiddleware = require('http-proxy-middleware');

var _httpProxyMiddleware2 = _interopRequireDefault(_httpProxyMiddleware);

var _koaJwt = require('koa-jwt');

var _koaJwt2 = _interopRequireDefault(_koaJwt);

var _log4js = require('log4js');

var _log4js2 = _interopRequireDefault(_log4js);

var _config = require('./config/config');

var _config2 = _interopRequireDefault(_config);

var _errorHandler = require('./middlewares/errorHandler');

var _errorHandler2 = _interopRequireDefault(_errorHandler);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _mongoConnection = require('./config/mongoConnection');

var _mongoConnection2 = _interopRequireDefault(_mongoConnection);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import session from 'koa-session2';
var tokenSecret = _config2.default.tokenSecret;

// Import custom middlewares.
// import authenticate from './middlewares/authenticate';
// import MongooseStore from './middlewares/session';
// import passport from './middlewares/passport';


require('dotenv').config();

_log4js2.default.configure('config/log4js.json');
var logger = _log4js2.default.getLogger();

logger.debug(process.cwd());
logger.debug();

// init db
(0, _mongoConnection2.default)();

// init server
var app = new _koa2.default();

// Add middlewares
app.use((0, _koaConvert2.default)((0, _koaJson2.default)()));
// https://cnodejs.org/topic/5761080bfa83165906ace310
app.use((0, _koaConvert2.default)((0, _koaBodyparser2.default)({ multipart: true })));
app.use((0, _koaConvert2.default)((0, _koaStatic2.default)(_path2.default.join(process.cwd(), 'static'), {})));

// app.keys = ['secret'];
// app.use(convert(session({ store: new MongooseStore() }, app)));

// Add passport support
// app.use(passport.initialize());
// app.use(passport.session());

// Authenticate middleware, if is authenticated, continues request.
// app.use(authenticate);

// Use jwt token authentication.
app.use(_errorHandler2.default);
app.use((0, _koaJwt2.default)({ secret: tokenSecret, key: 'jwtData' }).unless({
  path: [/\/auth\/login/, /\/auth\/logout/, /\/auth\/register/, /\/auth\/verifyemail/, /\/auth\/verifycode/]
}));

/**
 * Add Routes
 * Test: one app only support one router instance.
 */
app.use(_routes2.default.routes()).use(_routes2.default.allowedMethods());

app.use(function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx, next) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!ctx.url.startsWith('/api')) {
              _context.next = 3;
              break;
            }

            /**
             * 为什么要加上 ctx.respond = false;
             * https://blog.csdn.net/sunshao904/article/details/79256685
             * https://segmentfault.com/q/1010000014242953
             * 如果您想要写入原始的 res 对象而不是让 Koa 处理你的 response，请使用此参数。
             */
            ctx.respond = false;
            return _context.abrupt('return', (0, _httpProxyMiddleware2.default)({
              target: 'http://192.168.95.155', // 服务器地址
              changeOrigin: true,
              secure: false,
              pathRewrite: {
                '^/api/': '/'
              }
            })(ctx.req, ctx.res, next));

          case 3:
            return _context.abrupt('return', next());

          case 4:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
}());

module.exports = app;

var listener = app.listen(process.env.PORT || 3000, function () {
  logger.info('Koa2 server is running in http://localhost:' + listener.address().port);
});