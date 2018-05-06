import { Schema } from 'mongoose';

const huabanSchema = new Schema({
  pin_id: String,
  img_hash: String,
  width: Number,
  height: Number,
  username: String,
  urlname: String,
  raw_text: String,
  load_time: Number,
});

export default (mongo) => {
  mongo.model('huaban_drawcrowd', huabanSchema, 'huaban_drawcrowd');
};
