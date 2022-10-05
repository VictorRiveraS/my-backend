import { buildCheckFunction } from "express-validator";

const validator = buildCheckFunction(['body', 'params', 'query', 'headers']);

export const productValidator = [
    validator("product_id").notEmpty().optional().withMessage("Product id is required")
]