import nodemailer from 'nodemailer';

import config from '../config/config';
const emailConfig = config.emailConfig;

/**
 * Order 23: Send email by 126 mial.
 *
 */
class Sendmail {
  constructor() {
    this.transporter = nodemailer.createTransport({
      service: emailConfig.service,
      auth: {
        user: emailConfig.username,
        pass: emailConfig.password,
      },
    });
  }

  sendText(to, subject, content) {
    const mailOptions = {
      from: emailConfig.username,
      to,
      subject,
      text: content,
    };
    this.transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Email sent: ${info.response}`);
      }
    });
  }
}

export default new Sendmail();
