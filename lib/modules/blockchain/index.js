'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var prefix = '/blockchain';

exports.default = function (router) {
  router.get(['' + prefix, prefix + '/'], function (ctx) {
    ctx.body = 'This is blockchain test api.';
  });
};