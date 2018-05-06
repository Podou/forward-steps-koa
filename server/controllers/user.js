
import log4js from 'log4js';
import mongo from '../models';

const logger = log4js.getLogger();

const get = async (ctx) => {
  const obj = await mongo('huaban_drawcrowd').findOne({});
  logger.info('Request user info.');
  ctx.body = obj;
};

export default {
  get,
};
