
// import log4js from 'log4js';
import { userService } from '../services';

// const logger = log4js.getLogger();

const get = async (ctx) => {
  // logger.info('Get userInfo, passport session:', ctx.state.user);
  const { jwtData: { data: userInfo } } = ctx.state;
  ctx.body = userInfo;
};

const addUser = async (ctx) => {
  const user = ctx.request.body;
  const result = await userService.addNewUser(user);
  if (result) {
    ctx.body = 'Registry successful.';
  } else {
    ctx.body = 'Registry failure: username exists';
  }
};

export {
  get,
  addUser,
};
