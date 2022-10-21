import { buildCheckFunction } from "express-validator";

const validator = buildCheckFunction(['body', 'params', 'query', 'headers']);

export const brandsValidator = [
    validator("brand_id").notEmpty().optional().withMessage("Brand id is required")
]

export const addBrandsImageValidator = [
    validator('image').not().isMimeType().withMessage('Image is required.')
]; 