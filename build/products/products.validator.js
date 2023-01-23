"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProductImageValidator = exports.productCategoryValidator = exports.productValidator = void 0;
const express_validator_1 = require("express-validator");
const validator = (0, express_validator_1.buildCheckFunction)(['body', 'params', 'query', 'headers']);
exports.productValidator = [
    validator("product_id").notEmpty().optional().withMessage("Product id is required"),
    validator("product_name").notEmpty().optional().withMessage("Product name is required")
];
exports.productCategoryValidator = [
    validator("product_category_id").notEmpty().optional().withMessage("Category id is required"),
];
exports.addProductImageValidator = [
    validator('image').not().isMimeType().withMessage('Image is required.')
];
