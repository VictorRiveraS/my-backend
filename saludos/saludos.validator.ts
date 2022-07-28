import { buildCheckFunction } from 'express-validator';

const validator = buildCheckFunction(['body', 'params', 'query', 'headers']);

export const fetchAllSaludos = [
    validator('saludo').escape().isAlpha().withMessage('Name is contains more than letters')
];