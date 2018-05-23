import path from 'path';

// MongoDB databse config
export const mongoConfig = {
  username: 'yourUsername',
  password: 'yourPassword',
  host: 'yourHost',
  port: 27017,
  database: 'yourDatabase',
};

export const upload = {
  savePath: path.join(process.cwd(), 'static', 'file'),
  urlPath: 'file',
};
export const supportAuth = true;
export const tokenSecret = 'jwt-secret';

export default {
  mongoConfig,
};
