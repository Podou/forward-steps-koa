
import Router from 'koa-router';
import log4js from 'log4js';

import controllers from '../controllers';

const logger = log4js.getLogger();
const router = new Router();

router.get('/user', controllers.user.get);
router.post('/login', controllers.auth.login);
router.post('/logout', controllers.auth.logout);

logger.info('Initialize router successful');
export default router;
