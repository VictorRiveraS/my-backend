"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = require("path");
const env_1 = require("../config/env");
dotenv_1.default.config({ path: (0, path_1.join)(__dirname, '../../', `.env.${process.env.NODE_ENV || 'local'}`) });
class AwsBucketS3Service {
    static async uploadToFilesS3(bucketS3AWS, routeName, tempFilePath) {
        try {
            const s3 = new aws_sdk_1.default.S3({
                accessKeyId: env_1.AWS_S3_ACCESS_KEY_ID,
                secretAccessKey: env_1.AWS_S3_SECRET_ACCESS_KEY,
                region: env_1.AWS_S3_REGION
            });
            const stream = fs_1.default.createReadStream(tempFilePath);
            const params = {
                Bucket: bucketS3AWS,
                Key: routeName,
                Body: stream,
                ACL: 'public-read'
            };
            return new Promise((res, rej) => {
                s3.upload(params, (error, data) => {
                    if (error) {
                        rej(error);
                    }
                    res(data);
                });
            });
        }
        catch (err) {
            return err;
        }
    }
    static async deleteFileS3AWS(bucketS3AWS, routeName) {
        try {
            const s3 = new aws_sdk_1.default.S3({
                accessKeyId: env_1.AWS_S3_ACCESS_KEY_ID,
                secretAccessKey: env_1.AWS_S3_SECRET_ACCESS_KEY,
                region: env_1.AWS_S3_REGION
            });
            const params = {
                Bucket: bucketS3AWS,
                Key: routeName
            };
            return new Promise((res, rej) => {
                s3.deleteObject(params, (error, data) => {
                    if (error) {
                        rej(error);
                    }
                    res(data);
                });
            });
        }
        catch (err) {
            return err;
        }
    }
    static async getFileS3AWS(bucketS3AWS, routeName) {
        try {
            const s3 = new aws_sdk_1.default.S3({
                accessKeyId: env_1.AWS_S3_ACCESS_KEY_ID,
                secretAccessKey: env_1.AWS_S3_SECRET_ACCESS_KEY,
                region: env_1.AWS_S3_REGION
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
        }
        catch (err) {
            return err;
        }
    }
    static async uploadBufferS3AWS(bucketS3AWS, ContentType, routeName, buffer) {
        try {
            const s3 = new aws_sdk_1.default.S3({
                accessKeyId: env_1.AWS_S3_ACCESS_KEY_ID,
                secretAccessKey: env_1.AWS_S3_SECRET_ACCESS_KEY,
                region: env_1.AWS_S3_REGION
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
        }
        catch (error) {
            return error;
        }
    }
}
exports.default = AwsBucketS3Service;
