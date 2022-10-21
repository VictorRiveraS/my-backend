"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addBannerImageValidator = exports.bannerssValidator = void 0;
const express_validator_1 = require("express-validator");
const validator = (0, express_validator_1.buildCheckFunction)(['body', 'params', 'query', 'headers']);
exports.bannerssValidator = [
    validator("banner_id").notEmpty().optional().withMessage("Banner id is required")
];
exports.addBannerImageValidator = [
    validator('image').not().isMimeType().withMessage('Image is required.')
];
