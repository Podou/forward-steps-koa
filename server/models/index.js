import mongoose from 'mongoose';
import { mongoConfig } from '../config/config';
// import huabanSchema from './huaban';

// Connect to MongoDB databse with user & pass
const uri = `mongodb://${mongoConfig.username}:${mongoConfig.password}@${mongoConfig.host}:${mongoConfig.port}/${mongoConfig.database}`;
// const mongoConnection = mongoose.createConnection(uri);

mongoose.connect(uri);

// huabanSchema(mongoConnection);

// export default (name) => {
//   return mongoConnection.model(name);
// };
