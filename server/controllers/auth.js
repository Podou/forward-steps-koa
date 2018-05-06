import log4js from 'log4js';

import passport from '../middlewares/passport';

const logger = log4js.getLogger();

const login = async (ctx, next) => {
  const auth = passport.authenticate('local', async (err, user, info, status) => {
    logger.debug('Login Authenticate:', user, info, status);
    ctx.body = info;
    if (user) {
      const userInfo = ctx.request.body;
      await ctx.login(userInfo);
    }
  });
  return auth(ctx, next);
};

const logout = async (ctx) => {
  await ctx.logout();
  ctx.body = '登出成功';
};

export default {
  login,
  logout,
};
