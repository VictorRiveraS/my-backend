"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCategoryImageValidator = exports.categoriesValidator = void 0;
const express_validator_1 = require("express-validator");
const validator = (0, express_validator_1.buildCheckFunction)(['body', 'params', 'query', 'headers']);
exports.categoriesValidator = [
    validator("category_id").notEmpty().optional().withMessage("Category id is required")
];
exports.addCategoryImageValidator = [
    validator('image').not().isMimeType().withMessage('Image is required.')
];
