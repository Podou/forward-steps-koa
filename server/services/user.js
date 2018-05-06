import UserModel from '../models/User';
import * as utils from '../utils';

const addNewUser = async (user) => {
  const existUser = await UserModel.findOne({ username: user.username });
  if (existUser) {
    return false;
  }
  const userInfo = {
    username: user.username,
    password: utils.getPassword(user.password),
  };
  await UserModel.create(userInfo);
  return true;
};

const authUser = async (username, password) => {
  const existUser = await UserModel.findOne({
    username,
    password: utils.getPassword(password),
  });
  return existUser;
};

export {
  addNewUser,
  authUser,
};
