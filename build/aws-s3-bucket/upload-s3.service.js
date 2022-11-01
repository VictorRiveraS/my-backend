"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMultiFileVideoS3 = exports.uploadMultiFileS3 = exports.uploadMultiImageS3 = exports.uploadFileS3 = exports.uploadMultiFontS3 = exports.uploadImageS3 = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const multer_s3_1 = __importDefault(require("multer-s3"));
const env_1 = require("../config/env");
const s3 = new client_s3_1.S3Client({
    region: env_1.AWS_S3_REGION,
    credentials: {
        accessKeyId: env_1.AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: env_1.AWS_S3_SECRET_ACCESS_KEY
    }
});
const limits20Mb = { fileSize: 20 * 1024 * 1024 };
const limits5Mb = { fileSize: 5 * 1024 * 1024 };
const limits2Mb = { fileSize: 2 * 1024 * 1024 };
const storage = (0, multer_s3_1.default)({
    s3: s3,
    bucket: env_1.AWS_S3_BUCKET,
    acl: 'public-read',
    contentType: multer_s3_1.default.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
        const type = req.params.type_upload_s3;
        cb(null, { fieldName: type });
    },
    key: function (req, file, cb) {
        const type = req.params.type_upload_s3;
        const paths3 = req.params.route_upload_s3;
        var ext = path_1.default.extname(file.originalname);
        var fullPath = paths3 + type + ext;
        cb(null, fullPath);
    }
});
const storageMulti = (0, multer_s3_1.default)({
    s3: s3,
    bucket: env_1.AWS_S3_BUCKET,
    acl: 'public-read',
    contentType: multer_s3_1.default.AUTO_CONTENT_TYPE,
    metadata: function (req, file, cb) {
        const type = file.fieldname;
        cb(null, { fieldName: type });
    },
    key: function (req, file, cb) {
        const fieldname = file.fieldname;
        const type = req.params.type_upload_s3;
        const paths3 = req.params.route_upload_s3;
        var ext = path_1.default.extname(file.originalname);
        var fullPath = paths3 + type + "_" + fieldname + ext;
        cb(null, fullPath);
    }
});
const fileFilterImage = function (req, file, cb) {
    var ext = path_1.default.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg') {
        return cb(new Error('Only images are allowed.'));
    }
    cb(null, true);
};
const fileFilterMultimedia = function (req, file, cb) {
    var ext = path_1.default.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg' && ext !== '.mp4') {
        return cb(new Error('Only images and mp4 are allowed.'));
    }
    cb(null, true);
};
const fileFilterImageAndPDF = function (req, file, cb) {
    var ext = path_1.default.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg' && ext !== '.pdf') {
        return cb(new Error('Only images and pdf are allowed.'));
    }
    cb(null, true);
};
const fileFilterVideoImageAndPDF = function (req, file, cb) {
    var ext = path_1.default.extname(file.originalname);
    if (ext !== '.png' && ext !== '.jpg' && ext !== '.gif' && ext !== '.jpeg' && ext !== '.pdf' && ext != '.mp4') {
        return cb(new Error('Only images and pdf are allowed.'));
    }
    cb(null, true);
};
const fileFilterFont = function (req, file, cb) {
    var ext = path_1.default.extname(file.originalname);
    if (ext !== '.ttf' && ext !== '.oft') {
        return cb(new Error('Only fonts are allowed.'));
    }
    cb(null, true);
};
exports.uploadImageS3 = (0, multer_1.default)({ storage: storage, limits: limits5Mb, fileFilter: fileFilterImage });
exports.uploadMultiFontS3 = (0, multer_1.default)({ storage: storageMulti, limits: limits2Mb, fileFilter: fileFilterFont });
exports.uploadFileS3 = (0, multer_1.default)({ storage: storage, limits: limits20Mb, fileFilter: fileFilterMultimedia });
exports.uploadMultiImageS3 = (0, multer_1.default)({ storage: storageMulti, limits: limits5Mb, fileFilter: fileFilterImage });
exports.uploadMultiFileS3 = (0, multer_1.default)({ storage: storageMulti, limits: limits5Mb, fileFilter: fileFilterImageAndPDF });
exports.uploadMultiFileVideoS3 = (0, multer_1.default)({ storage: storageMulti, limits: limits20Mb, fileFilter: fileFilterVideoImageAndPDF });
