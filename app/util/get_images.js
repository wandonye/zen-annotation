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
      const jsonFile = fileArr.slice(0, fileArr.length).concat(['json']).join('.');
      let boxes = [];
      try {
        const content = fs.readFileSync(path.join(dirPath, jsonFile));
        boxes = JSON.parse(content);
      } catch(err) {
        // console.log(err);
      }
      const imagePath = path.join(dirPath, file);
      const dimensions = sizeOf(imagePath);
      images.push({
        name: fileArr.join('.'),
        path: imagePath,
        width: dimensions.width,
        height: dimensions.height,
        annotations: boxes
      });
    }
  );

  return images;
};
