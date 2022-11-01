"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LaboratoriesRoutes = void 0;
const express_1 = require("express");
const laboratories_ctrl_1 = __importDefault(require("./laboratories.ctrl"));
const validators_1 = __importDefault(require("../helpers/validators"));
const laboratories_validator_1 = require("./laboratories.validator");
const upload_s3_service_1 = require("../aws-s3-bucket/upload-s3.service");
exports.LaboratoriesRoutes = (0, express_1.Router)();
exports.LaboratoriesRoutes
    .get('/', validators_1.default.validate, laboratories_ctrl_1.default.fetchBrands)
    .get('/id', laboratories_validator_1.laboratoriesValidator, validators_1.default.validate, laboratories_ctrl_1.default.getBrandsById)
    .post('/', validators_1.default.validate, laboratories_ctrl_1.default.createBrands)
    .post('/picture-laboratory', laboratories_ctrl_1.default.setInfoUpload, upload_s3_service_1.uploadImageS3.single('file'), laboratories_validator_1.addLaboratoriesImageValidator, validators_1.default.validate, laboratories_ctrl_1.default.addBrandsImage)
    .patch('/', laboratories_validator_1.laboratoriesValidator, validators_1.default.validate, laboratories_ctrl_1.default.updateBrands)
    .delete('/', laboratories_validator_1.laboratoriesValidator, validators_1.default.validate, laboratories_ctrl_1.default.deleteBrands);
