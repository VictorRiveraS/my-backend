"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addSubcategoryImageValidator = exports.subsubcategoriesValidator = exports.subcategoriesValidator = exports.addCategoryImageValidator = exports.categoriesValidator = void 0;
const express_validator_1 = require("express-validator");
const validator = (0, express_validator_1.buildCheckFunction)(['body', 'params', 'query', 'headers']);
exports.categoriesValidator = [
    validator("category_id").notEmpty().optional().withMessage("Category id is required")
];
exports.addCategoryImageValidator = [
    validator('image').not().isMimeType().withMessage('Image is required.')
];
exports.subcategoriesValidator = [
    validator("subcategory_id").notEmpty().optional().withMessage("Subcategory id is required")
];
exports.subsubcategoriesValidator = [
    validator("subsubcategory_id").notEmpty().optional().withMessage("Subsubcategory id is required")
];
exports.addSubcategoryImageValidator = [
    validator('image').not().isMimeType().withMessage('Image is required.')
];
