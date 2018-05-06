import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import convert from 'koa-convert';
import json from 'koa-json';
// import passport from 'koa-passport';
import session from 'koa-session2';

import log4js from 'log4js';

import authenticate from './server/middlewares/authenticate';
import passport from './server/middlewares/passport';
import router from './server/routes';
import modelInit from './server/models';

log4js.configure('./server/config/log4js.json');
const logger = log4js.getLogger();

// init db
modelInit();

// init server
const app = new Koa();

// Add middlewares
app.use(convert(bodyParser()));
app.use(convert(json()));

app.keys = ['secret'];
app.use(bodyParser());
app.use(session({}, app));

// Add passport support
app.use(passport.initialize());
app.use(passport.session());

// Authenticate middleware, if is authenticated, continues request.
app.use(authenticate);

// Add routes
app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);
logger.info('Koa2 server is running in http://localhost:3000');
