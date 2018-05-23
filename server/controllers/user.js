
// import log4js from 'log4js';
import { userService } from '../services';

// const logger = log4js.getLogger();

const get = async (ctx) => {
  // const obj = await mongo('huaban_drawcrowd').findOne({});
  // logger.info('Get userInfo, passport session:', ctx.state.user);
  ctx.body = 'ctx.state.user';
};

const addUser = async (ctx) => {
  const user = ctx.request.body;
  const result = await userService.addNewUser(user);
  // const existUser = await UserModel.findOne({ username: user.username });
  // if (!existUser) {
  //   const userInfo = {
  //     username: user.username,
  //     password: getPassword(user.password),
  //   };
  //   await UserModel.create(userInfo);
  //   ctx.body = userInfo;
  // } else {
  //   ctx.body = 'Username exists.';
  // }
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
