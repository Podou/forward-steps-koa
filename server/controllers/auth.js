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
    registerUser.password = '******';
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

    existUser.password = '******';
    // 生成 token 返回给客户端
    const token = jsonwebtoken.sign({
      data: existUser,
    }, tokenSecret, { expiresIn: '1h' });
    ctx.body = {
      msg: 'Login successful.',
      user: existUser,
      token,
    };
  } catch (err) {
    ctx.status = 401;
    ctx.body = {
      msg: err.message,
    };
  }
};

/**
 * TODO: How to revoke token from koa-jwt.
 * @param {koa.Context} ctx
 */
const logout = async (ctx) => {
  ctx.body = 'Logout successful';
};

const verifyEmail = async (ctx) => {
  // Verify Email and send validate code to the email.
};

const verifyCode = async (ctx) => {
  // Verify the code and the email. And return the token.
};

const changePassword = async (ctx) => {
  // const { jwtData: { data: userInfo } } = ctx.state;
  // const { body } = ctx.request;
  // if (userInfo && userInfo.username && body && body.oldPassword && body.newPassword) {

  // }
};

const changePic = async (ctx) => {
  // Update user pic
};

const changeNickname = async (ctx) => {
  // Update user nickname
};

export default {
  register,
  login,
  logout,
  verifyCode,
  verifyEmail,
  changeNickname,
  changePassword,
  changePic,
};
