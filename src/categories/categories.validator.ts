import { buildCheckFunction } from "express-validator";

const validator = buildCheckFunction(['body', 'params', 'query', 'headers']);

export const categoriesValidator = [
    validator("category_id").notEmpty().optional().withMessage("Category id is required")
];

export const addCategoryImageValidator = [
    validator('image').not().isMimeType().withMessage('Image is required.')
];

export const subcategoriesValidator = [
    validator("subcategory_id").notEmpty().optional().withMessage("Subcategory id is required")
];

export const subsubcategoriesValidator = [
    validator("subsubcategory_id").notEmpty().optional().withMessage("Subsubcategory id is required")
];

export const addSubcategoryImageValidator = [
    validator('image').not().isMimeType().withMessage('Image is required.')
]; 