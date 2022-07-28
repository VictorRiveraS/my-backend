import { buildCheckFunction } from 'express-validator';

const validator = buildCheckFunction(['body', 'params', 'query', 'headers']);

export const changePasswordValidator = [
    validator('email').escape().isEmail().withMessage('Email is not valid'),
    validator('new_password').escape().isLength({ min: 8, max: 15 }).withMessage('Password must be between 8 and 15 characters long')
];