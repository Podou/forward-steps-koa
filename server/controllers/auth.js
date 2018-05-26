import jsonwebtoken from 'jsonwebtoken';

import { tokenSecret } from '../config/config';
import * as UserService from '../services/user';

/**
 * Register user.
 * @param {koa} ctx
 */
const register = async (ctx) => {
  const { body } = ctx.request;
  if (!body.username || !body.password) {
    ctx.status = 400;
    ctx.body = {
      error: `expected an object with username, password but got: ${body}`,
    };
    return;
  }
  try {
    const registerUser = await UserService.addNewUser(body.username, body.password);
    ctx.body = {
      msg: '注册成功',
      user: registerUser,
    };
  } catch (err) {
    ctx.status = 401;
    ctx.body = {
      msg: err.message,
    };
  }
};

/**
 * Login user.
 * @param {koa} ctx
 */
const login = async (ctx) => {
  const { body } = ctx.request;
  try {
    const existUser = await UserService.authUser(body.username, body.password);
    ctx.status = 200;
    ctx.body = {
      msg: 'Login successful.',
      user: existUser,
      // 生成 token 返回给客户端
      token: jsonwebtoken.sign({
        data: existUser,
      }, tokenSecret, { expiresIn: '1h' }),
    };
  } catch (err) {
    ctx.status = 401;
    ctx.body = {
      msg: err.message,
    };
  }
};

const logout = async (ctx) => {
  await ctx.logout();
  ctx.body = 'Logout successful';
};

export default {
  register,
  login,
  logout,
};
