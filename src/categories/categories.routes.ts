import { Router } from 'express';
import ctrl from './categories.ctrl';
import RouteValidator from '../helpers/validators';
import { addCategoryImageValidator, addSubcategoryImageValidator, categoriesValidator, subcategoriesValidator } from './categories.validator';
import { uploadImageS3 } from '../aws-s3-bucket/upload-s3.service';

export const CategoriesRoutes = Router();

CategoriesRoutes
    .get('/', RouteValidator.validate, ctrl.fetchCategories)
    .get('/id', categoriesValidator, RouteValidator.validate, ctrl.getCategoriesById)
    .post('/', RouteValidator.validate, ctrl.createCategories)
    .post('/picture-category', ctrl.setInfoUpload, uploadImageS3.single('file'), addCategoryImageValidator, RouteValidator.validate, ctrl.addCategoriesImage)
    .patch('/', categoriesValidator, RouteValidator.validate, ctrl.updateCategories)
    .delete('/', categoriesValidator, RouteValidator.validate, ctrl.deleteCategories)
    .get('/subcategories', RouteValidator.validate, ctrl.fetchSubcategories)
    .get('/subcategories/id', subcategoriesValidator, RouteValidator.validate, ctrl.getSubcategoriesById)
    .post('/subcategories', RouteValidator.validate, ctrl.createSubcategories)
    .post('/subcategories/picture-subcategory', ctrl.setInfoSubCatUpload, uploadImageS3.single('file'), addSubcategoryImageValidator, RouteValidator.validate, ctrl.addSubcategoriesImage)
    .patch('/subcategories', subcategoriesValidator, RouteValidator.validate, ctrl.updateSubcategories)
    .delete('/subcategories', subcategoriesValidator, RouteValidator.validate, ctrl.deleteSubcategories); 