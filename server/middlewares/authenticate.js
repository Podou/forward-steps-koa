

const authenticate = async (ctx, next) => {
  const requestUrl = ctx.request.url;
  if (ctx.isAuthenticated() || requestUrl === '/login' || requestUrl === 'logout') {
    await next();
  } else if (ctx.isUnauthenticated()) {
    ctx.body = '用户未登陆，请先登录！';
  }
};
export default authenticate;
