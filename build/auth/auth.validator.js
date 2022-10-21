"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordValidator = exports.forgotPasswordValidator = exports.loginValidator = void 0;
const express_validator_1 = require("express-validator");
const validator = (0, express_validator_1.buildCheckFunction)(['body', 'params', 'query', 'headers']);
exports.loginValidator = [
    validator('email').escape().isEmail().withMessage('Email is not valid'),
    validator('password').escape().isLength({ min: 8, max: 15 }).withMessage('Password must be between 8 and 15 characters long')
];
exports.forgotPasswordValidator = [
    validator('email').escape().isEmail().withMessage('Email is not valid')
];
exports.resetPasswordValidator = [
    validator('email').escape().isEmail().withMessage('Email is not valid'),
    validator('new_password').escape().isLength({ min: 8, max: 15 }).withMessage('Password must be between 8 and 15 characters long'),
    validator('token').escape().isLength({ min: 1 }).withMessage('Token is required')
];
