import log4js from 'log4js';

import passport from '../middlewares/passport';
import { addUser } from './user';

const logger = log4js.getLogger();

const register = async (ctx, next) => {
  const result = await addUser(ctx, next);
  logger.debug('registry user', result);
};

const login = async (ctx, next) => {
  const auth = passport.authenticate('local', async (err, user, info, status) => {
    logger.debug('Login Authenticate:', user, info, status);
    ctx.body = info;
    if (user) {
      await ctx.login(user);
    }
  });
  return auth(ctx, next);
};

const logout = async (ctx) => {
  await ctx.logout();
  ctx.body = 'Logout successful';
};

export default {
  login,
  logout,
  register,
};
