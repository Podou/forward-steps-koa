import Promise from 'bluebird';
import path from 'path';

const fs = Promise.promisifyAll(require('fs'));

export const existFolder = async (folderPath) => {
  if (!await fs.exists(folderPath)) {
    await fs.mkdir(folderPath);
  }
};

export const saveFileByFileSystem = (file, savePath, filename) => {
  const saveTo = path.join(savePath, filename);
  file.pipe(fs.createWriteStream(saveTo));
};
