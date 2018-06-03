import mongoose from 'mongoose';
import { mongoConfig } from './config';

// Connect to MongoDB databse with user & pass
const uri = `mongodb://${mongoConfig.username}:${mongoConfig.password}@${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.database}`;
// const mongoConnection = mongoose.createConnection(uri);

export default () => {
  mongoose.connect(uri);
};
