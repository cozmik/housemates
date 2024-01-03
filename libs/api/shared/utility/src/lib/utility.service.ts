import {Inject, Injectable, InternalServerErrorException} from '@nestjs/common';
import {Cloudinary} from "./cloudinary.providers";
import * as path from 'path';
import DataURIParser = require("datauri/parser");
import {CloudinaryService} from "nestjs-cloudinary";

@Injectable()
export class UtilityService {
  constructor(@Inject(Cloudinary) private cloudinary, private readonly uploaderService: CloudinaryService) {
    this.cloudinary.config({
      cloud_name: 'cozmiktech',
      api_key: '351238717159174',
      api_secret: '5hUCqPhCEiXMsS_nO1tMfIDFJlA',
    });
  }

  async upload(file, folderName: string): Promise<any> {
    const dataUri = new DataURIParser();
    const data = dataUri.format(path.extname(file.originalname).toString(), file.buffer);
    return await this.cloudinary.v2.uploader.upload(data.content, {folder: 'housemates/' + folderName});
  }

   async processImages(images, folder) {
    return Promise.all(images.map((file) => {
      return this.uploaderService.uploadFile(file.file, {folder})
        .then((image) => {
          const imageLinkArr = image.secure_url.split('/');
          const medium = [...imageLinkArr];
          // const small = [...imageLinkArr];
          // const thumbnail = [...imageLinkArr];
          // small.splice(6, 0, 't_small');

          const imageObj = {
            name: file.name,
            file: {
              main: image.secure_url,
              thumbnail: medium.join('/'),
            }
          };
          return imageObj;
        }).catch((err) => {
          throw new InternalServerErrorException({error: err});
        });
    }));
  }
}
