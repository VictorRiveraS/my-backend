"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addBrandsImageValidator = exports.brandsValidator = void 0;
const express_validator_1 = require("express-validator");
const validator = (0, express_validator_1.buildCheckFunction)(['body', 'params', 'query', 'headers']);
exports.brandsValidator = [
    validator("brand_id").notEmpty().optional().withMessage("Brand id is required")
];
exports.addBrandsImageValidator = [
    validator('image').not().isMimeType().withMessage('Image is required.')
];
