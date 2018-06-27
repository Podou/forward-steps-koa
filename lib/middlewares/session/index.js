'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Refer to https://www.npmjs.com/package/koa-session-mongoose
 */
var MongooseStore = function () {
  function MongooseStore() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$collection = _ref.collection,
        collection = _ref$collection === undefined ? 'sessions' : _ref$collection,
        _ref$connection = _ref.connection,
        connection = _ref$connection === undefined ? _mongoose2.default : _ref$connection,
        _ref$expires = _ref.expires,
        expires = _ref$expires === undefined ? 86400 : _ref$expires,
        _ref$name = _ref.name,
        name = _ref$name === undefined ? 'Session' : _ref$name;

    (0, _classCallCheck3.default)(this, MongooseStore);

    var updatedAt = (0, _extends3.default)({}, _schema2.default.updatedAt, { expires: expires });
    var Schema = connection.Schema;

    this.session = connection.model(name, new Schema((0, _extends3.default)({}, _schema2.default, { updatedAt: updatedAt })), collection);
  }

  (0, _createClass3.default)(MongooseStore, [{
    key: 'destroy',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(id) {
        var session;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                session = this.session;
                return _context.abrupt('return', session.remove({ _id: id }));

              case 2:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function destroy(_x2) {
        return _ref2.apply(this, arguments);
      }

      return destroy;
    }()
  }, {
    key: 'get',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(id) {
        var session, _ref4, data;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                session = this.session;
                _context2.next = 3;
                return session.findById(id);

              case 3:
                _context2.t0 = _context2.sent;

                if (_context2.t0) {
                  _context2.next = 6;
                  break;
                }

                _context2.t0 = {};

              case 6:
                _ref4 = _context2.t0;
                data = _ref4.data;
                return _context2.abrupt('return', data);

              case 9:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function get(_x3) {
        return _ref3.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: 'set',
    value: function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(id, data, maxAge, modify) {
        var changed, rolling, session, record;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!modify) {
                  _context3.next = 7;
                  break;
                }

                changed = modify.changed, rolling = modify.rolling;

                if (!(changed || rolling)) {
                  _context3.next = 7;
                  break;
                }

                session = this.session;
                record = { _id: id, data: data, updatedAt: new Date() };
                _context3.next = 7;
                return session.findByIdAndUpdate(id, record, { upsert: true, safe: true });

              case 7:
                return _context3.abrupt('return', data);

              case 8:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function set(_x4, _x5, _x6, _x7) {
        return _ref5.apply(this, arguments);
      }

      return set;
    }()
  }], [{
    key: 'create',
    value: function create(opts) {
      return new MongooseStore(opts);
    }
  }]);
  return MongooseStore;
}();

exports.default = MongooseStore;