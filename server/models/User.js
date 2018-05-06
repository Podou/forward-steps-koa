import mongoose, { Schema } from 'mongoose';
import './index';

const UserSchema = new Schema({
  username: String,
  password: String,
});

export default mongoose.model('User', UserSchema, 'user');
