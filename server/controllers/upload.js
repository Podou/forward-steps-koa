
import log4js from 'log4js';
import Busboy from 'busboy';

import { upload } from '../config/config';
// import uploadConfig from '../config/uploadConfig';
import { fileUtils, codeUtils } from '../utils';

const logger = log4js.getLogger();

export default async (ctx) => {
  const request = ctx.req;
  await fileUtils.existFolder(upload.savePath);
  return new Promise((resolve) => {
    const files = [];
    // Use busboy to handle upload file
    const busboy = new Busboy({ headers: request.headers });
    busboy.on('file', (fieldname, file, filename) => {
      // Generate UUID filename
      let saveFilename = codeUtils.getUuid();
      // Save file
      saveFilename = `${saveFilename}${filename.substring(filename.lastIndexOf('.'), filename.length)}`;
      fileUtils.saveFileByFileSystem(file, upload.savePath, saveFilename);
      logger.debug('Upload file', filename, '. Rename', saveFilename);

      // Support multpart files.
      files.push({
        fileUrl: `${upload.urlPath}/${saveFilename}`,
        filename,
        fieldname,
      });
    });

    busboy.on('finish', () => {
      ctx.body = files;
      // Must add resolve function to finish Promise.
      resolve();
    });
    request.pipe(busboy);
  });
};
