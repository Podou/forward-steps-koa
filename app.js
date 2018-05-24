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

import { tokenSecret } from './server/config/config';

// Import custom middlewares.
// import authenticate from './server/middlewares/authenticate';
// import MongooseStore from './server/middlewares/session';
// import passport from './server/middlewares/passport';
import errorHandle from './server/middlewares/errorHandler';

import router from './server/routes';
import modelInit from './server/models';

require('dotenv').config();

log4js.configure('./server/config/log4js.json');
const logger = log4js.getLogger();

logger.debug(process.cwd());
logger.debug();

// init db
modelInit();

// init server
const app = new Koa();

// Add middlewares
app.use(convert(bodyParser()));
app.use(convert(json()));
app.use(convert(bodyParser()));
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
app.use(jwt({ secret: tokenSecret, key: 'token' }).unless({
  path: [
    /\/login/,
    /\/logout/,
    /\/register/,
  ],
}));

// Add routes
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


var listener = app.listen((process.env.PORT || 3000), function (){
  logger.info('Koa2 server is running in http://localhost:' + listener.address().port);
});
