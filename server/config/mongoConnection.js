import mongoose from 'mongoose';
import config from './config';
const mongoConfig = config.mongoConfig

// Connect to MongoDB databse with user & pass
const uri = `mongodb://${mongoConfig.username}:${mongoConfig.password}@${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.database}`;
// const mongoConnection = mongoose.createConnection(uri);

export default () => {
  mongoose.connect(uri);
};
