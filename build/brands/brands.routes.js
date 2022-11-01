"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandsRoutes = void 0;
const express_1 = require("express");
const brands_ctrl_1 = __importDefault(require("./brands.ctrl"));
const validators_1 = __importDefault(require("../helpers/validators"));
const brands_validator_1 = require("./brands.validator");
const upload_s3_service_1 = require("../aws-s3-bucket/upload-s3.service");
exports.BrandsRoutes = (0, express_1.Router)();
exports.BrandsRoutes
    .get('/', validators_1.default.validate, brands_ctrl_1.default.fetchBrands)
    .get('/id', brands_validator_1.brandsValidator, validators_1.default.validate, brands_ctrl_1.default.getBrandsById)
    .post('/', validators_1.default.validate, brands_ctrl_1.default.createBrands)
    .post('/picture-brand', brands_ctrl_1.default.setInfoUpload, upload_s3_service_1.uploadImageS3.single('file'), brands_validator_1.addBrandsImageValidator, validators_1.default.validate, brands_ctrl_1.default.addBrandsImage)
    .patch('/', brands_validator_1.brandsValidator, validators_1.default.validate, brands_ctrl_1.default.updateBrands)
    .delete('/', brands_validator_1.brandsValidator, validators_1.default.validate, brands_ctrl_1.default.deleteBrands);
