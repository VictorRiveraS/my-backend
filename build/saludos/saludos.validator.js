"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAllSaludos = void 0;
const express_validator_1 = require("express-validator");
const validator = (0, express_validator_1.buildCheckFunction)(['body', 'params', 'query', 'headers']);
exports.fetchAllSaludos = [
    validator('saludo').escape().isAlpha().withMessage('Name is contains more than letters')
];
