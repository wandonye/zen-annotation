// @flow
import fs from 'fs';
import path from 'path';

import { imageType } from '../reducers/types';

const sizeOf = require('image-size');

const validExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];

export default (dirPath: string): Array<imageType> => {
  const images: Array<imageType> = [];

  fs.readdirSync(dirPath).forEach(
    (file: string): void => {
      const fileArr: Array<string> = file.split('.');
      const ext: string = fileArr.pop().toLowerCase();
      if (validExtensions.indexOf(ext) < 0) return;

      const imagePath = path.join(dirPath, file);
      const dimensions = sizeOf(imagePath);
      images.push({
        name: fileArr.join('.'),
        path: imagePath,
        width: dimensions.width,
        height: dimensions.height
      });
    }
  );

  return images;
};
