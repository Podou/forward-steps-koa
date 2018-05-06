
import passport from 'koa-passport';
import LocalStrategy from 'passport-local';
import log4js from 'log4js';

const logger = log4js.getLogger();

passport.use(new LocalStrategy.Strategy((username, password, done) => {
  logger.debug('Passport LocalStrategy', username, password);
  if (username === 'admin') {
    if (password === '123') {
      return done(null, true, '登陆成功');
    }
    return done(null, false, '密码错误');
  }
  return done(null, false, '未知用户');
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
