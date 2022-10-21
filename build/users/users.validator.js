"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordValidator = void 0;
const express_validator_1 = require("express-validator");
const validator = (0, express_validator_1.buildCheckFunction)(['body', 'params', 'query', 'headers']);
exports.changePasswordValidator = [
    validator('email').escape().isEmail().withMessage('Email is not valid'),
    validator('new_password').escape().isLength({ min: 8, max: 15 }).withMessage('Password must be between 8 and 15 characters long')
];
