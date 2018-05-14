const schema = {
  _id: String,
  data: Object,
  updatedAt: {
    default: new Date(),
    expires: 86400, // 1 day
    type: Date,
  },
};

export default schema;
