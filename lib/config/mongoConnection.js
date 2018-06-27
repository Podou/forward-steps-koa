'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mongoConfig = _config2.default.mongoConfig;

// Connect to MongoDB databse with user & pass
var uri = 'mongodb://' + mongoConfig.username + ':' + mongoConfig.password + '@' + mongoConfig.host + ':' + mongoConfig.port + '/' + mongoConfig.database;
// const mongoConnection = mongoose.createConnection(uri);

exports.default = function () {
  _mongoose2.default.connect(uri);
};