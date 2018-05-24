import UserModel from '../models/User';
import * as utils from '../utils';

const addNewUser = async (user) => {
  const queryUser = { username: user.username };
  const existUser = await UserModel.findOne(queryUser);
  if (existUser) {
    throw new Error('User exists.');
  }

  try {
    const userInfo = {
      username: user.username,
      password: utils.getPassword(user.password),
    };
    return await UserModel.create(userInfo);
  } catch (err) {
    throw err;
  }
};

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

export {
  addNewUser,
  authUser,
};
