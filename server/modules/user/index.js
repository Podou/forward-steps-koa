// import Router from 'koa-router';
import controllers from '../../controllers';

// const router = new Router({
//   prefix: '/auth',
// });
const prefix = '/auth';

export default (router) => {
  router.post(`${prefix}/login`, controllers.auth.login);
  router.post(`${prefix}/logout`, controllers.auth.logout);
  router.post(`${prefix}/register`, controllers.auth.register);
  router.post(`${prefix}/verifycode`, controllers.auth.verifyCode);
  router.post(`${prefix}/verifyemail`, controllers.auth.verifyEmail);
  router.post(`${prefix}/changenickname`, controllers.auth.changeNickname);
  router.post(`${prefix}/changepassword`, controllers.auth.changePasswordWithCode);
  router.post(`${prefix}/changepic`, controllers.auth.changePic);
};
