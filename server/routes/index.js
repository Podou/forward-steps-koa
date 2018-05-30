
import Router from 'koa-router';
import log4js from 'log4js';
import controllers from '../controllers';
import blockchain from '../api/blockchain';

const logger = log4js.getLogger();
const router = new Router();

router.get('/user', controllers.user.get);

router.post('/auth/login', controllers.auth.login);
router.post('/auth/logout', controllers.auth.logout);
router.post('/auth/register', controllers.auth.register);
router.post('/auth/verifycode', controllers.auth.verifyCode);
router.post('/auth/verifyemail', controllers.auth.verifyEmail);
router.post('/auth/changenickname', controllers.auth.changeNickname);
router.post('/auth/changepassword', controllers.auth.changePasswordWithCode);
router.post('/auth/changepic', controllers.auth.changePic);

router.post('/upload', controllers.upload);

router.routes('/blockchain', blockchain);

logger.info('Initialize router successful');
export default router;
