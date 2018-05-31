import UserModel from '../models/user';
import * as utils from '../../../utils';

/**
 * Create new User:
 * 1. Create new user with username and password
 * 2. Init nickname with ''
 */
const addNewUser = async (username, password) => {
  if (!username || !password) {
    throw new Error('Username or password must be not null.');
  }
  if (!utils.stringUtils.isEmail(username)) {
    throw new Error('Username must be email.');
  }

  if (!utils.stringUtils.isPassword(password)) {
    throw new Error('Password\'s length must be bigger than or equal 6.');
  }
  const queryUser = { username };
  const existUser = await UserModel.findOne(queryUser);
  if (existUser) {
    throw new Error('User exists.');
  }

  try {
    const userInfo = {
      username,
      password: utils.getPassword(password),
      createTime: new Date().getTime(),
      updateTime: new Date().getTime(),
    };
    return await UserModel.create(userInfo);
  } catch (err) {
    throw err;
  }
};

/**
 * User login
 * @param {*string} username
 * @param {*string} password
 */
const authUser = async (username, password) => {
  try {
    const existUser = await UserModel.findOne({
      username,
      password: utils.getPassword(password),
    });
    if (!existUser) {
      throw new Error('Username or password is not valid.');
    }
    return existUser;
  } catch (err) {
    throw err;
  }
};

const updateNickname = async (username, nickname) => {
  if (!username || !nickname) {
    throw new Error('Username or nickname must be not null.');
  }

  // Username must exist.
  const queryUser = { username };
  const existUser = await UserModel.findOne(queryUser);
  if (existUser) {
    throw new Error('User exists.');
  }

  try {
    await UserModel.update(queryUser);
  } catch (err) {
    throw err;
  }
};

const changePassword = async (email, newPassword) => {
  if (!utils.stringUtils.isEmail(email)) {
    throw new Error('Wrong username');
  }

  if (!utils.stringUtils.isPassword(newPassword)) {
    throw new Error('Password\'s length must be bigger than or equal 6.');
  }
  try {
    await UserModel.update({ password: utils.getPassword(newPassword) }).where({ username: email });
  } catch (err) {
    throw err;
  }
};

const changeNickname = async (username, nickname) => {
  if (!utils.stringUtils.isEmail(username)) {
    throw new Error('Wrong username');
  }

  if (!nickname) {
    throw new Error('Nickname can\'t be null');
  }
  try {
    await UserModel.update({ nickname }).where({ username });
  } catch (err) {
    throw err;
  }
};

const changePic = async (username, pic) => {
  if (!utils.stringUtils.isEmail(username)) {
    throw new Error('Wrong username');
  }

  if (!pic) {
    throw new Error('Username pic can\'t be null');
  }
  try {
    await UserModel.update({ pic }).where({ username });
  } catch (err) {
    throw err;
  }
};

export {
  addNewUser,
  authUser,
  updateNickname,
  changePassword,
  changeNickname,
  changePic,
};
