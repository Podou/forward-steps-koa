import crypto from 'crypto';

export default (text) => {
  const md5Text = crypto.createHash('md5').update(text, 'utf8').digest('hex');
  return crypto.createHash('sha1').update(md5Text, 'utf8').digest('hex');
};
