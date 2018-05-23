import path from 'path';

// MongoDB databse config
export const mongoConfig = {
  username: 'little_bean',
  password: 'little_654321_bean',
  host: 'www.podou.club',
  port: 27017,
  database: 'podou',
};

export const upload = {
  savePath: path.join(process.cwd(), 'static', 'file'),
  urlPath: 'file',
};
export const supportAuth = false;
export const tokenSecret = 'jwt-secret';

export default {
  mongoConfig,
};
