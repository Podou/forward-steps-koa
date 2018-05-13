import fs from 'fs';
import path from 'path';

export const existFolder = (folderPath) => {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
};

export const saveFileByFileSystem = (file, savePath, filename) => {
  const saveTo = path.join(savePath, filename);
  file.pipe(fs.createWriteStream(saveTo));
};
