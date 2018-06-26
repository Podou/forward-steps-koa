import fs from 'fs';
import _ from 'lodash';
import path from 'path';

/**
 * 映射 d 文件夹下的文件为模块
 */
const mapDir = (d) => {
  const tree = {};
  // 获得当前文件夹下的所有的文件夹和文件
  const [dirs, files] = _(fs.readdirSync(d)).partition((p) => {
    fs.statSync(path.join(d, p)).isDirectory();
  });

  // 映射文件夹
  dirs.forEach((dir) => {
    tree[dir] = mapDir(path.join(d, dir));
  });

  // 映射文件
  files.forEach((file) => {
    const moduleFolder = path.join(d, file);
    if (fs.statSync(moduleFolder).isDirectory()) {
      // eslint-disable-next-line
      tree[path.basename(file, '.js')] = require(`${moduleFolder}/index.js`).default;
    }
  });
  return tree;
};

export default mapDir(__dirname);
