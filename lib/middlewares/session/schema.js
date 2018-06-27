"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var schema = {
  _id: String,
  data: Object,
  updatedAt: {
    default: new Date(),
    expires: 86400, // 1 day
    type: Date
  }
};

exports.default = schema;