import { buildCheckFunction } from 'express-validator';

const validator = buildCheckFunction(['body', 'params', 'query', 'headers']);

export const loginValidator = [
    validator('email').escape().isEmail().withMessage('Email is not valid'),
    validator('password').escape().isLength({ min: 8, max: 15 }).withMessage('Password must be between 8 and 15 characters long')
];

export const forgotPasswordValidator = [
    validator('email').escape().isEmail().withMessage('Email is not valid')
];

export const resetPasswordValidator = [
    validator('email').escape().isEmail().withMessage('Email is not valid'),
    validator('new_password').escape().isLength({ min: 8, max: 15 }).withMessage('Password must be between 8 and 15 characters long'),
    validator('token').escape().isLength({ min: 1 }).withMessage('Token is required')
];