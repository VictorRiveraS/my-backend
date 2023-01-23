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
    .get('/id/:id', categories_validator_1.categoriesValidator, validators_1.default.validate, categories_ctrl_1.default.getCategoriesById)
    .post('/', validators_1.default.validate, categories_ctrl_1.default.createCategories)
    .patch('/', categories_validator_1.categoriesValidator, validators_1.default.validate, categories_ctrl_1.default.updateCategories)
    .delete('/', categories_validator_1.categoriesValidator, validators_1.default.validate, categories_ctrl_1.default.deleteCategories)
    .post('/picture-category', categories_ctrl_1.default.setInfoUpload, upload_s3_service_1.uploadImageS3.single('file'), categories_validator_1.addCategoryImageValidator, validators_1.default.validate, categories_ctrl_1.default.addCategoriesImage)
    .get('/subcategories', validators_1.default.validate, categories_ctrl_1.default.fetchSubcategories)
    .get('/subcategories/id/:id', categories_validator_1.subcategoriesValidator, validators_1.default.validate, categories_ctrl_1.default.getSubcategoriesById)
    .post('/subcategories', validators_1.default.validate, categories_ctrl_1.default.createSubcategories)
    .patch('/subcategories', categories_validator_1.subcategoriesValidator, validators_1.default.validate, categories_ctrl_1.default.updateSubcategories)
    .delete('/subcategories', categories_validator_1.subcategoriesValidator, validators_1.default.validate, categories_ctrl_1.default.deleteSubcategories)
    .post('/subcategories/picture-subcategory', categories_ctrl_1.default.setInfoSubCatUpload, upload_s3_service_1.uploadImageS3.single('file'), categories_validator_1.addSubcategoryImageValidator, validators_1.default.validate, categories_ctrl_1.default.addSubcategoriesImage)
    .get('/subsubcategories', validators_1.default.validate, categories_ctrl_1.default.fetchSubsubcategories)
    .get('/subsubcategories/id/:id', categories_validator_1.subsubcategoriesValidator, validators_1.default.validate, categories_ctrl_1.default.getSubsubcategoriesById)
    .post('/subsubcategories', validators_1.default.validate, categories_ctrl_1.default.createSubsubcategories)
    .patch('/subsubcategories', categories_validator_1.subsubcategoriesValidator, validators_1.default.validate, categories_ctrl_1.default.updateSubsubcategories)
    .delete('/subsubcategories', categories_validator_1.subsubcategoriesValidator, validators_1.default.validate, categories_ctrl_1.default.deleteSubsubcategories)
    .post('/subsubcategories/picture-subcategory', categories_ctrl_1.default.setInfoSubCatUpload, upload_s3_service_1.uploadImageS3.single('file'), categories_validator_1.addSubcategoryImageValidator, validators_1.default.validate, categories_ctrl_1.default.addSubcategoriesImage);
