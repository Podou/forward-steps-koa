import jsonwebtoken from 'jsonwebtoken';

import { tokenSecret } from '../config/config';

const register = async (ctx) => {
  const { body } = ctx.request;
  try {
    if (!body.username || !body.password) {
      ctx.status = 400;
      ctx.body = {
        error: `expected an object with username, password but got: ${body}`,
      };
      return;
    }

    const user = {
      username: body.username,
      password: body.password,
    };
    ctx.body = {
      message: '注册成功',
      user,
    };

    // body.password = await bcrypt.hash(body.password, 5)
    // let user = await User.find({ username: body.username });
    // if (!user.length) {
    //   const newUser = new User(body);
    //   user = await newUser.save();
    //   ctx.status = 200;
    //   ctx.body = {
    //     message: '注册成功',
    //     user,
    //   }
    // } else {
    //   ctx.status = 406;
    //   ctx.body = {
    //     message: '用户名已经存在',
    //   };
    // }
  } catch (error) {
    ctx.throw(500);
  }
};

const login = async (ctx) => {
  const { body } = ctx.request;
  const user = {
    username: body.username,
    password: body.password,
  };

  try {
    ctx.status = 200;
    ctx.body = {
      message: '登录成功',
      user,
      // 生成 token 返回给客户端
      token: jsonwebtoken.sign({
        data: user,
      }, tokenSecret, { expiresIn: '1h' }),
    };
    // const user = await User.findOne({ username: body.username });
    // if (!user) {
    //   ctx.status = 401
    //   ctx.body = {
    //     message: '用户名错误',
    //   }
    //   return;
    // }
    // 匹配密码是否相等
    // if (await bcrypt.compare(body.password, user.password)) {
    //   ctx.status = 200
    //   ctx.body = {
    //     message: '登录成功',
    //     user: user.userInfo,
    //     // 生成 token 返回给客户端
    //     token: jsonwebtoken.sign({
    //       data: user,
    //       // 设置 token 过期时间
    //       exp: Math.floor(Date.now() / 1000) + (60 * 60), // 60 seconds * 60 minutes = 1 hour
    //     }, secret),
    //   }
    // } else {
    //   ctx.status = 401
    //   ctx.body = {
    //     message: '密码错误',
    //   }
    // }
  } catch (error) {
    ctx.throw(500);
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
