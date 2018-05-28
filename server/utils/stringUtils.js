import is from 'is_js';

export const isEmail = (text) => {
  return is.email(text);
};

export const isIpv4 = (text) => {
  return is.ipv4(text);
};

export const isPassword = (text) => {
  return text && text.length >= 6 && text.length <= 20;
};
