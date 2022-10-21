"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannersRoutes = void 0;
const express_1 = require("express");
const banners_ctrl_1 = __importDefault(require("./banners.ctrl"));
const validators_1 = __importDefault(require("../helpers/validators"));
const banners_validator_1 = require("./banners.validator");
const upload_s3_service_1 = require("../aws-s3-bucket/upload-s3.service");
exports.BannersRoutes = (0, express_1.Router)();
exports.BannersRoutes
    .get('/', validators_1.default.validate, banners_ctrl_1.default.fetchBanners)
    .get('/id', banners_validator_1.bannerssValidator, validators_1.default.validate, banners_ctrl_1.default.getBannerById)
    .post('/', validators_1.default.validate, banners_ctrl_1.default.createBanner)
    .post('/picture-banner', banners_ctrl_1.default.setInfoUpload, upload_s3_service_1.uploadImageS3.single('file'), banners_validator_1.addBannerImageValidator, validators_1.default.validate, banners_ctrl_1.default.addNewsImage)
    .patch('/', banners_validator_1.bannerssValidator, validators_1.default.validate, banners_ctrl_1.default.updateBanner)
    .delete('/', banners_validator_1.bannerssValidator, validators_1.default.validate, banners_ctrl_1.default.deleteBanner);
