

import uuid from 'uuid/v1';

export const getUuid = () => {
  return uuid();
};

export const getSixCode = () => {
  let num = '';
  /* eslint-disable no-plusplus */
  for (let i = 0; i < 6; i++) {
    num += Math.floor(Math.random() * 10);
  }
  return num;
};

