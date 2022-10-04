import dotenv from 'dotenv';
import { join } from 'path';

dotenv.config({ path: join(__dirname, '../../', `.env.${process.env.NODE_ENV || 'local'}`) });

export const URL: string = process.env.URL as string;
export const PORT: string = process.env.PORT as string;
export const TIME_ZONE: string = process.env.TIME_ZONE as string;
export const MONGO_URI: string = process.env.MONGO_URI as string;
export const JWT_SECRET: string = process.env.JWT_SECRET as string;
export const EMAIL_USER: string = process.env.EMAIL_USER as string;
export const EMAIL_PASS: string = process.env.EMAIL_PASS as string;
export const EMAIL_HOST: string = process.env.EMAIL_HOST as string;
export const EMAIL_PORT: string = process.env.EMAIL_PORT as string;
export const DEST_FOLDER: string = process.env.DEST_FOLDER as string;
export const AWS_S3_REGION: string = process.env.AWS_S3_REGION;
export const AWS_S3_BUCKET: string = process.env.AWS_S3_BUCKET;
export const AWS_S3_ACCESS_KEY_ID: string = process.env.AWS_S3_KEY_ID;
export const AWS_S3_SECRET_ACCESS_KEY: string = process.env.AWS_S3_SECRET_ACCESS_KEY;