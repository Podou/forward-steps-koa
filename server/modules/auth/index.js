// import Router from 'koa-router';
import authController from './controllers';

// const router = new Router({
//   prefix: '/auth',
// });
const prefix = '/auth';

export default (router) => {
  router.post(`${prefix}/login`, authController.login);
  router.post(`${prefix}/logout`, authController.logout);
  router.post(`${prefix}/register`, authController.register);
  router.post(`${prefix}/verifycode`, authController.verifyCode);
  router.post(`${prefix}/verifyemail`, authController.verifyEmail);
  router.post(`${prefix}/changenickname`, authController.changeNickname);
  router.post(`${prefix}/changepassword`, authController.changePasswordWithCode);
  router.post(`${prefix}/changepic`, authController.changePic);
};
