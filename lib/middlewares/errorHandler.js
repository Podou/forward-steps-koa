"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (ctx, next) {
  return next().catch(function (err) {
    console.log(err.status, err);
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = {
        error: err.originalError ? err.originalError.message : err.message
      };
    } else {
      throw err;
    }
  });
};