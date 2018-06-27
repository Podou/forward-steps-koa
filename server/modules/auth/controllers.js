import jsonwebtoken from 'jsonwebtoken';

import config from '../../config/config';
import * as userService from './services/user';
import * as verifyService from './services/verify';

const tokenSecret = config.tokenSecret;

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
    const registerUser = await userService.addNewUser(body.username, body.password);
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
    const existUser = await userService.authUser(body.username, body.password);
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

/**
 * Verify email and send verify code to the email.
 * Needn't token.
 * @param {* koa.Context} ctx
 */
const verifyEmail = async (ctx) => {
  // Verify Email and send validate code to the email.
  const { body: { email } } = ctx.request;
  try {
    await verifyService.verifyEmail(email);
    ctx.body = {
      msg: 'Send email',
    };
  } catch (err) {
    ctx.status = 401;
    ctx.body = {
      msg: err.message,
    };
  }
};

/**
 * Verify code which is sent by email.
 * Needn't token.
 * @param {* koa.Context} ctx
 */
const verifyCode = async (ctx) => {
  const { body: { email, code } } = ctx.request;
  try {
    await verifyService.verifyCode(email, code);
    // Generate token, it defferent with login token, the data namespace is different.
    const token = jsonwebtoken.sign({
      changePassword: {
        username: email,
      },
    }, tokenSecret, { expiresIn: '1h' });
    ctx.body = {
      msg: 'Verify code successful',
      token,
    };
  } catch (err) {
    ctx.status = 401;
    ctx.body = {
      msg: err.message,
    };
  }
};

const changePasswordWithCode = async (ctx) => {
  const { jwtData: { changePassword: { username } } } = ctx.state;
  const { body: { newPassword } } = ctx.request;
  try {
    await userService.changePassword(username, newPassword);
    ctx.body = {
      msg: 'Update password successful.',
    };
  } catch (err) {
    ctx.status = 401;
    ctx.body = {
      msg: err.message,
    };
  }
};

const changePic = async (ctx) => {
  // Update user pic
  const { jwtData: { data: { username } } } = ctx.state;
  const { body: { pic } } = ctx.request;
  try {
    await userService.changePic(username, pic);
    ctx.body = {
      msg: 'Update user picture successful.',
    };
  } catch (err) {
    ctx.status = 401;
    ctx.body = {
      msg: err.message,
    };
  }
};

const changeNickname = async (ctx) => {
  const { jwtData: { data: { username } } } = ctx.state;
  const { body: { nickname } } = ctx.request;
  try {
    await userService.changeNickname(username, nickname);
    ctx.body = {
      msg: 'Update nickname successful.',
    };
  } catch (err) {
    ctx.status = 401;
    ctx.body = {
      msg: err.message,
    };
  }
  // Update user nickname
};

export default {
  register,
  login,
  logout,
  verifyCode,
  verifyEmail,
  changeNickname,
  changePasswordWithCode,
  changePic,
};
