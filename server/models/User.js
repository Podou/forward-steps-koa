import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
  username: String,
  password: String,
});

export default mongoose.model('User', UserSchema, 'user');
