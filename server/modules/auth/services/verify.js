import { stringUtils, codeUtils, emialUtils } from '../../../utils';
import VerifyCodeModel from '../models/verifyCode';

export const verifyEmail = async (email) => {
  if (!stringUtils.isEmail(email)) {
    throw new Error('Invalid Email');
  }

  try {
    const code = codeUtils.getSixCode();
    const verifyCodeInfo = {
      code,
      username: email,
      isUsed: false,
      expiresIn: new Date().getTime() + (3600 * 1000),
      createTime: new Date().getTime(),
    };
    await VerifyCodeModel.update({ isUsed: true }).where({ username: email, isUsed: false });
    await VerifyCodeModel.create(verifyCodeInfo);
    emialUtils.sendText(
      email,
      'Change password',
      `Code ${code}`,
    );
  } catch (err) {
    throw err;
  }
};

export const verifyCode = async (email, code) => {
  try {
    const res = await VerifyCodeModel.findOne({ username: email, code, isUsed: false });
    if (res && !res.isUsed && res.expiresIn >= new Date().getTime()) {
      await VerifyCodeModel.update({ isUsed: true }).where({ username: email, isUsed: false });
    } else {
      throw new Error('Wrong code.');
    }
  } catch (err) {
    throw err;
  }
};
