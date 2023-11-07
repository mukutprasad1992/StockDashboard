import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as path from 'path';
import { first } from 'rxjs';
import * as admin from 'firebase-admin';


@Injectable()
export class FileUploadService {
    AWS_S3_BUCKET = 'stockawsbucket';
    s3 = new AWS.S3({
        accessKeyId: 'AKIATLQ7BIBVAHRWHHRD',
        secretAccessKey: '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',
    });
    async uploadFile(files) {
        console.info(files);
        const uploadedFiles = [];

        for (const file of files.documents) {
            const generateImageName = `image_${Date.now().toString()}${path.extname(file.originalname)}`;
            const s3Response = await this.s3_upload(
                file.buffer,
                this.AWS_S3_BUCKET,
                generateImageName,
            );

            // Save the file information to Firestore
            const firestoreDocument = await this.saveFileToFirestore({
                name: generateImageName,
                url: s3Response.Location,
                // Add more data if needed
            });

            uploadedFiles.push(firestoreDocument);

            console.log('File saved to Firestore:', firestoreDocument);
        }

        return uploadedFiles;
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

    async saveFileToFirestore(file) {
        // Firestore collection where you want to store the files
        const collection = admin.firestore().collection('users');

        try {
            const fileName = file.name;
            const url = file.url;
            const concatenatedData = ` ${url} `; // Concatenate the name and URL

            const docRef = await collection.add({
                fileData: concatenatedData, // Store the concatenated data as a single field
            });

            return concatenatedData; // Return the concatenated data
        } catch (error) {
            console.error('Failed to save file information to Firestore:', error);
            throw new Error('Failed to save file information to Firestore');
        }
    }
}


