import mongoose, { Schema } from 'mongoose';

const VerifyCodeSchema = new Schema({
  code: String,
  username: String,
  isUsed: Boolean,
  createDate: String,
  expiresIn: Number,
});

export default mongoose.model('VerifyCode', VerifyCodeSchema, 'verifyCode');
