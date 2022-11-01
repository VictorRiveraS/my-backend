import { buildCheckFunction } from "express-validator";

const validator = buildCheckFunction(['body', 'params', 'query', 'headers']);

export const laboratoriesValidator = [
    validator("laboratory_id").notEmpty().optional().withMessage("Laboratory id is required")
]

export const addLaboratoriesImageValidator = [
    validator('image').not().isMimeType().withMessage('Image is required.')
]; 