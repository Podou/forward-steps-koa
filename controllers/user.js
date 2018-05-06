
import mongo from '../models';

const get = async (ctx) => {
  const obj = await mongo('huaban_drawcrowd').findOne({});
  ctx.body = obj;
};

export default {
  get,
};
