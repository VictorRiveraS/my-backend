import { buildCheckFunction } from "express-validator";

const validator = buildCheckFunction(['body', 'params', 'query', 'headers']);

export const productValidator = [
    validator("product_id").notEmpty().optional().withMessage("Product id is required"),
    validator("product_name").notEmpty().optional().withMessage("Product name is required")
]

export const addProductImageValidator = [
    validator('image').not().isMimeType().withMessage('Image is required.')
]; 