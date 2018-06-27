'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

var _config = require('../config/config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var emailConfig = _config2.default.emailConfig;

/**
 * Order 23: Send email by 126 mial.
 *
 */

var Sendmail = function () {
  function Sendmail() {
    (0, _classCallCheck3.default)(this, Sendmail);

    this.transporter = _nodemailer2.default.createTransport({
      service: emailConfig.service,
      auth: {
        user: emailConfig.username,
        pass: emailConfig.password
      }
    });
  }

  (0, _createClass3.default)(Sendmail, [{
    key: 'sendText',
    value: function sendText(to, subject, content) {
      var mailOptions = {
        from: emailConfig.username,
        to: to,
        subject: subject,
        text: content
      };
      this.transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    }
  }]);
  return Sendmail;
}();

exports.default = new Sendmail();