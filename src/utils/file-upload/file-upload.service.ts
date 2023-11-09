import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as path from 'path';

@Injectable()
export class FileUploadService {
    AWS_S3_BUCKET = 'stockawsbucket';
    s3 = new AWS.S3({
        accessKeyId: 'AKIATLQ7BIBVAHRWHHRD',
        secretAccessKey: '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',
    });

    async uploadFile(files) {
        console.info(files);
        let file = files.profilePic[0];

        const generateImageName = `image_${Date.now().toString()}${path.extname(file.originalname)}`;
        const s3Response = await this.s3_upload(
            file.buffer,
            this.AWS_S3_BUCKET,
            generateImageName,
        );

        return s3Response;
    }

    async s3_upload(file, bucket, name) {
        const params = {
            Bucket: bucket,
            Key: String(name),
            Body: file,
        };

        try {
            let s3Response = await this.s3.upload(params).promise();
            return s3Response;
        } catch (e) {
            console.log(e);
            // Handle the S3 upload error
            throw new Error('Failed to upload file to S3');
        }
    }

}