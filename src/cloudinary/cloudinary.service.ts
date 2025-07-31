import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';
import * as bufferToStream from 'buffer-to-stream'; 

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

@Injectable()
export class CloudinaryService {
  async upload(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        { folder: 'uploads' },
        (err, result) => {
          if (err || !result)
            return reject(err || new Error('No result returned'));
          resolve(result.secure_url);
        },
      );

      bufferToStream(file.buffer).pipe(upload);
    });
  }
}
