
import Router from 'koa-router';
import controllers from '../controllers';

// const router = new Router({
//   prefix: '/',
// });
const router = new Router();

router.get('/user', controllers.user.get);

export default router;
