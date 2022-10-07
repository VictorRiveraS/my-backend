/* import fs from 'fs';
import AWS from 'aws-sdk';
import dotenv from 'dotenv';
import { join } from 'path';
import { AWS_S3_ACCESS_KEY_ID, AWS_S3_SECRET_ACCESS_KEY, AWS_S3_REGION } from '../config/env';

dotenv.config({ path: join(__dirname, '../../', `.env.${process.env.NODE_ENV || 'local'}`) });

export default class AwsBucketS3Service {

    public static async uploadToFilesS3(bucketS3AWS: string, routeName: string, tempFilePath: string): Promise<any> {
        try {
            const s3 = new AWS.S3({
                accessKeyId: AWS_S3_ACCESS_KEY_ID,
                secretAccessKey: AWS_S3_SECRET_ACCESS_KEY,
                region: AWS_S3_REGION
            });

            const stream = fs.createReadStream(tempFilePath);
            const params = {
                Bucket: bucketS3AWS,
                Key: routeName,
                Body: stream,
                ACL: 'public-read'
            };
            return new Promise((res, rej) => {
                s3.upload(params, (error: Error, data: unknown) => {
                    if (error) {
                        rej(error);
                    }
                    res(data);
                });
            });
        } catch (err) {
            return err;
        }
    }

    public static async deleteFileS3AWS(bucketS3AWS: string, routeName: string): Promise<unknown> {
        try {
            const s3 = new AWS.S3({
                accessKeyId: AWS_S3_ACCESS_KEY_ID,
                secretAccessKey: AWS_S3_SECRET_ACCESS_KEY,
                region: AWS_S3_REGION
            });
            const params = {
                Bucket: bucketS3AWS,
                Key: routeName
            };

            return new Promise((res, rej) => {
                s3.deleteObject(params, (error: Error, data: unknown) => {
                    if (error) {
                        rej(error);
                    }
                    res(data);
                });
            });
        } catch (err) {
            return err;
        }
    }

    public static async getFileS3AWS(bucketS3AWS: string, routeName: string): Promise<unknown> {
        try {
            const s3 = new AWS.S3({
                accessKeyId: AWS_S3_ACCESS_KEY_ID,
                secretAccessKey: AWS_S3_SECRET_ACCESS_KEY,
                region: AWS_S3_REGION
            });
            const params = {
                Bucket: bucketS3AWS,
                Key: routeName
            };

            const file = await s3.getObject(params).promise();
            return {
                data: file.Body,
                mimetype: file.ContentType
            };
        } catch (err) {
            return err;
        }
    }

    public static async uploadBufferS3AWS(bucketS3AWS: string, ContentType: string, routeName: string, buffer: string): Promise<unknown> {
        try {
            const s3 = new AWS.S3({
                accessKeyId: AWS_S3_ACCESS_KEY_ID,
                secretAccessKey: AWS_S3_SECRET_ACCESS_KEY,
                region: AWS_S3_REGION
            });
            const params = {
                Bucket: bucketS3AWS,
                Key: routeName,
                Body: Buffer.from(buffer, 'base64'),
                ContentType: ContentType,
                ACL: 'public-read'
            };

            const response = await s3.upload(params).promise();
            return response;
        } catch (error) {
            return error;
        }
    }

} */