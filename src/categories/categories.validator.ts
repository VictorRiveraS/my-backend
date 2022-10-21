import { buildCheckFunction } from "express-validator";

const validator = buildCheckFunction(['body', 'params', 'query', 'headers']);

export const categoriesValidator = [
    validator("category_id").notEmpty().optional().withMessage("Category id is required")
]

export const addBannerImageValidator = [
    validator('image').not().isMimeType().withMessage('Image is required.')
]; 