import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  username: String,
  password: String,
  nickname: String,
  pic: String,
  email: String,
  phone: String,
  createTime: Number,
  updateTime: Number,
});

export default mongoose.model('User', UserSchema, 'user');
