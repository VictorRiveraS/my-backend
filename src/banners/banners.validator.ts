import { buildCheckFunction } from "express-validator";

const validator = buildCheckFunction(['body', 'params', 'query', 'headers']);

export const bannerssValidator = [
    validator("banner_id").notEmpty().optional().withMessage("Banner id is required")
]