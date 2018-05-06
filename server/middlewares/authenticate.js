
import log4js from 'log4js';

const logger = log4js.getLogger();
const UnAuthUrls = [
  '/login',
  '/logout',
  '/registry',
];
const authenticate = async (ctx, next) => {
  const requestUrl = ctx.request.url;
  logger.debug('Request', ctx.request.method, requestUrl);
  if (ctx.isAuthenticated() || UnAuthUrls.indexOf(requestUrl) !== -1) {
    await next();
  } else if (ctx.isUnauthenticated()) {
    ctx.body = '用户未登陆，请先登录！';
  }
};
export default authenticate;
