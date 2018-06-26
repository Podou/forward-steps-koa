
// import log4js from 'log4js';
// import { userService } from '../services';

// const logger = log4js.getLogger();

const get = async (ctx) => {
  // logger.info('Get userInfo, passport session:', ctx.state.user);
  const { jwtData: { data: userInfo } } = ctx.state;
  ctx.body = userInfo;
};

const tt = 0;
export {
  get,
  tt,
};
