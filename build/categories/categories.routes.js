"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriesRoutes = void 0;
const express_1 = require("express");
const categories_ctrl_1 = __importDefault(require("./categories.ctrl"));
const validators_1 = __importDefault(require("../helpers/validators"));
const categories_validator_1 = require("./categories.validator");
const upload_s3_service_1 = require("../aws-s3-bucket/upload-s3.service");
exports.CategoriesRoutes = (0, express_1.Router)();
exports.CategoriesRoutes
    .get('/', validators_1.default.validate, categories_ctrl_1.default.fetchCategories)
    .get('/id', categories_validator_1.categoriesValidator, validators_1.default.validate, categories_ctrl_1.default.getCategoriesById)
    .post('/', validators_1.default.validate, categories_ctrl_1.default.createCategories)
    .post('/picture-category', categories_ctrl_1.default.setInfoUpload, upload_s3_service_1.uploadImageS3.single('file'), categories_validator_1.addCategoryImageValidator, validators_1.default.validate, categories_ctrl_1.default.addCategoriesImage)
    .patch('/', categories_validator_1.categoriesValidator, validators_1.default.validate, categories_ctrl_1.default.updateCategories)
    .delete('/', categories_validator_1.categoriesValidator, validators_1.default.validate, categories_ctrl_1.default.deleteCategories);
