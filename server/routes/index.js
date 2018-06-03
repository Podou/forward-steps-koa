
import Router from 'koa-router';
import log4js from 'log4js';
import _ from 'lodash';

import controllers from '../controllers';
import modules from '../modules';

const logger = log4js.getLogger();

const router = new Router();
router.get('/user', controllers.user.get);
router.post('/upload', controllers.upload);

/**
 * Init all routes from modules.
 */
_.forEach(modules, (value) => {
  if (typeof value === 'function') {
    value(router);
  }
});

logger.info('Initialize router successful');
export default router;
