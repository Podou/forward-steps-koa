
import passport from 'koa-passport';
import LocalStrategy from 'passport-local';
import log4js from 'log4js';

import { userService } from '../services';

const logger = log4js.getLogger();

passport.use(new LocalStrategy.Strategy(async (username, password, done) => {
  logger.debug('Passport LocalStrategy', username, password);
  const existUser = await userService.authUser(username, password);
  if (existUser) {
    // 用户存在，返回用户信息
    return done(null, existUser, 'Login successful');
  }
  return done(null, false, 'Username or password is wrong');
}));

// serializeUser 在用户登录验证成功以后将会把用户的数据存储到 session 中
passport.serializeUser((user, done) => {
  logger.debug('Passport SerializeUser', user);
  done(null, user);
});

// deserializeUser 在每次请求的时候将从 session 中读取用户对象
passport.deserializeUser((user, done) => {
  logger.debug('Passport DeserializeUser', user);
  return done(null, user);
});

export default passport;
