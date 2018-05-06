import Koa from 'koa';
import log4js from 'log4js';
import router from './server/routes';

log4js.configure('./server/config/log4js.json');
const logger = log4js.getLogger();

const app = new Koa();

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000);
logger.info('Koa2 server is running in http://localhost:3000');
