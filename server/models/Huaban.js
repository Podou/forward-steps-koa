import mongoose, { Schema } from 'mongoose';

const HuabanSchema = new Schema({
  pin_id: String,
  img_hash: String,
  width: Number,
  height: Number,
  username: String,
  urlname: String,
  raw_text: String,
  load_time: Number,
});

export default mongoose.model('huaban_drawcrowd', HuabanSchema, 'huaban_drawcrowd');
