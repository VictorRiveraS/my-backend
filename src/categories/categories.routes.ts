import { Router } from 'express';
import ctrl from './categories.ctrl';
import RouteValidator from '../helpers/validators';
import { addCategoryImageValidator, categoriesValidator } from './categories.validator';
import { uploadImageS3 } from '../aws-s3-bucket/upload-s3.service';

export const CategoriesRoutes = Router();

CategoriesRoutes
    .get('/', RouteValidator.validate, ctrl.fetchCategories)
    .get('/id', categoriesValidator, RouteValidator.validate, ctrl.getCategoriesById)
    .post('/', RouteValidator.validate, ctrl.createCategories)
    .post('/picture-category', ctrl.setInfoUpload, uploadImageS3.single('file'), addCategoryImageValidator, RouteValidator.validate, ctrl.addCategoriesImage)
    .patch('/', categoriesValidator, RouteValidator.validate, ctrl.updateCategories)
    .delete('/', categoriesValidator, RouteValidator.validate, ctrl.deleteCategories);