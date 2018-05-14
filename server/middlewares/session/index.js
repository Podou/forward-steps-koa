import mongoose from 'mongoose';
import schema from './schema';

/**
 * Refer to https://www.npmjs.com/package/koa-session-mongoose
 */
class MongooseStore {
  constructor({
    collection = 'sessions',
    connection = mongoose,
    expires = 86400,
    name = 'Session',
  } = {}) {
    const updatedAt = { ...schema.updatedAt, expires };
    const { Schema } = connection;
    this.session = connection.model(name, new Schema({ ...schema, updatedAt }), collection);
  }

  async destroy(id) {
    const { session } = this;
    return session.remove({ _id: id });
  }

  async get(id) {
    const { session } = this;
    const { data } = await session.findById(id) || {};
    return data;
  }

  async set(id, data, maxAge, modify) {
    if (modify) {
      const { changed, rolling } = modify;
      if (changed || rolling) {
        const { session } = this;
        const record = { _id: id, data, updatedAt: new Date() };
        await session.findByIdAndUpdate(id, record, { upsert: true, safe: true });
      }
    }
    return data;
  }

  static create(opts) {
    return new MongooseStore(opts);
  }
}

export default MongooseStore;
