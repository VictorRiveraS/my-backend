/* import { S3Client } from '@aws-sdk/client-s3';
import { S3 } from "aws-sdk";
import path from "path";
import multer from "multer";
import multerS3 from "multer-s3";
import { AWS_S3_ACCESS_KEY_ID, AWS_S3_SECRET_ACCESS_KEY, AWS_S3_REGION, AWS_S3_BUCKET } from '../config/env';
import { Request } from 'express';

const s3 = new S3Client({
    region: AWS_S3_REGION,
    credentials: {
        accessKeyId: AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: AWS_S3_SECRET_ACCESS_KEY
    }
});
const limits20Mb = { fileSize: 20 * 1024 * 1024 };
const limits5Mb = { fileSize: 5 * 1024 * 1024 };
const limits2Mb = { fileSize: 2 * 1024 * 1024 };

const storage = multerS3({
    s3: s3,
    bucket: AWS_S3_BUCKET,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req: Request, file, cb) {
        const type: string = req.params.type_upload_s3;
        cb(null, { fieldName: type });
    },
    key: function (req, file, cb) {
        const type: string = req.params.type_upload_s3;
        const paths3: string = req.params.route_upload_s3;
        var ext = path.extname(file.originalname);
        var fullPath = paths3 + type + ext;
        cb(null, fullPath)
    }
});

const storageMulti = multerS3({
    s3: s3,
    bucket: AWS_S3_BUCKET,
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: function (req: Request, file, cb) {
        const type: string = file.fieldname;
        cb(null, { fieldName: type });
    },
    key: function (req, file, cb) {
        const fieldname = file.fieldname;
        const type: string = req.params.type_upload_s3;
        const paths3: string = req.params.route_upload_s3;
        var ext = path.extname(file.originalname);
        var fullPath = paths3 + type + "_" + fieldname + ext;
        cb(null, fullPath)
    }
});

const fileFilterImage = function (req, file, cb) {
    var ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
        return cb(new Error('Only images are allowed.'))
    }
    cb(null, true)
};

const fileFilterMultimedia = function (req, file, cb) {
    var ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg' && ext !== '.mp4') {
        return cb(new Error('Only images and mp4 are allowed.'))
    }
    cb(null, true)
};

const fileFilterImageAndPDF = function (req, file, cb) {
    var ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg' && ext !== '.pdf') {
        return cb(new Error('Only images and pdf are allowed.'))
    }
    cb(null, true)
};

const fileFilterVideoImageAndPDF = function (req, file, cb) {
    var ext = path.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg' && ext !== '.pdf' && ext != '.mp4') {
        return cb(new Error('Only images and pdf are allowed.'))
    }
    cb(null, true)
};

const fileFilterFont = function (req, file, cb) {
    var ext = path.extname(file.originalname);
    if (ext !== '.ttf' && ext !== '.oft') {
        return cb(new Error('Only fonts are allowed.'))
    }
    cb(null, true)
};

export const uploadImageS3 = multer({ storage: storage, limits: limits5Mb, fileFilter: fileFilterImage });
export const uploadMultiFontS3 = multer({ storage: storageMulti, limits: limits2Mb, fileFilter: fileFilterFont });
export const uploadFileS3 = multer({ storage: storage, limits: limits20Mb, fileFilter: fileFilterMultimedia });
export const uploadMultiImageS3 = multer({ storage: storageMulti, limits: limits5Mb, fileFilter: fileFilterImage });
export const uploadMultiFileS3 = multer({ storage: storageMulti, limits: limits5Mb, fileFilter: fileFilterImageAndPDF });
export const uploadMultiFileVideoS3 = multer({ storage: storageMulti, limits: limits20Mb, fileFilter: fileFilterVideoImageAndPDF }); */