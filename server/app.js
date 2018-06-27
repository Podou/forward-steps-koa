import Koa from 'koa';
import path from 'path';

import bodyParser from 'koa-bodyparser';
import convert from 'koa-convert';
import json from 'koa-json';
// import session from 'koa-session2';
import serve from 'koa-static';
import proxy from 'http-proxy-middleware';
import jwt from 'koa-jwt';

import log4js from 'log4js';

import config from './config/config';

// Import custom middlewares.
// import authenticate from './middlewares/authenticate';
// import MongooseStore from './middlewares/session';
// import passport from './middlewares/passport';
import errorHandle from './middlewares/errorHandler';

import router from './routes';
import mongoConnection from './config/mongoConnection';

const tokenSecret = config.tokenSecret;

require('dotenv').config();

log4js.configure('config/log4js.json');
const logger = log4js.getLogger();

logger.debug(process.cwd());
logger.debug();

// init db
mongoConnection();

// init server
const app = new Koa();

// Add middlewares
app.use(convert(json()));
// https://cnodejs.org/topic/5761080bfa83165906ace310
app.use(convert(bodyParser({ multipart: true })));
app.use(convert(serve(path.join(process.cwd(), 'static'), {})));

// app.keys = ['secret'];
// app.use(convert(session({ store: new MongooseStore() }, app)));

// Add passport support
// app.use(passport.initialize());
// app.use(passport.session());

// Authenticate middleware, if is authenticated, continues request.
// app.use(authenticate);

// Use jwt token authentication.
app.use(errorHandle);
app.use(jwt({ secret: tokenSecret, key: 'jwtData' }).unless({
  path: [
    /\/auth\/login/,
    /\/auth\/logout/,
    /\/auth\/register/,
    /\/auth\/verifyemail/,
    /\/auth\/verifycode/,
  ],
}));

/**
 * Add Routes
 * Test: one app only support one router instance.
 */
app
  .use(router.routes())
  .use(router.allowedMethods());

app.use(async (ctx, next) => {
  if (ctx.url.startsWith('/api')) {
    /**
     * 为什么要加上 ctx.respond = false;
     * https://blog.csdn.net/sunshao904/article/details/79256685
     * https://segmentfault.com/q/1010000014242953
     * 如果您想要写入原始的 res 对象而不是让 Koa 处理你的 response，请使用此参数。
     */
    ctx.respond = false;
    return proxy({
      target: 'http://192.168.95.155', // 服务器地址
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/api/': '/',
      },
    })(ctx.req, ctx.res, next);
  }
  return next();
});

module.exports = app;

const listener = app.listen((process.env.PORT || 3000), () => {
  logger.info(`Koa2 server is running in http://localhost:${listener.address().port}`);
});
