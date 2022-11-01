"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addLaboratoriesImageValidator = exports.laboratoriesValidator = void 0;
const express_validator_1 = require("express-validator");
const validator = (0, express_validator_1.buildCheckFunction)(['body', 'params', 'query', 'headers']);
exports.laboratoriesValidator = [
    validator("laboratory_id").notEmpty().optional().withMessage("Laboratory id is required")
];
exports.addLaboratoriesImageValidator = [
    validator('image').not().isMimeType().withMessage('Image is required.')
];
