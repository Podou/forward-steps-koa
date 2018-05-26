import is from 'is_js';

export const isEmail = (text) => {
  return is.email(text);
};

export const isIpv4 = (text) => {
  return is.ipv4(text);
};
