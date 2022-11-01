import { Router } from 'express';
import ctrl from './categories.ctrl';
import RouteValidator from '../helpers/validators';
import { addCategoryImageValidator, addSubcategoryImageValidator, categoriesValidator, subcategoriesValidator, subsubcategoriesValidator } from './categories.validator';
import { uploadImageS3 } from '../aws-s3-bucket/upload-s3.service';

export const CategoriesRoutes = Router();

CategoriesRoutes
    .get('/', RouteValidator.validate, ctrl.fetchCategories)
    .get('/id/:id', categoriesValidator, RouteValidator.validate, ctrl.getCategoriesById)
    .post('/', RouteValidator.validate, ctrl.createCategories)
    .patch('/', categoriesValidator, RouteValidator.validate, ctrl.updateCategories)
    .delete('/', categoriesValidator, RouteValidator.validate, ctrl.deleteCategories)
    .post('/picture-category', ctrl.setInfoUpload, uploadImageS3.single('file'), addCategoryImageValidator, RouteValidator.validate, ctrl.addCategoriesImage)
    .get('/subcategories', RouteValidator.validate, ctrl.fetchSubcategories)
    .get('/subcategories/id/:id', subcategoriesValidator, RouteValidator.validate, ctrl.getSubcategoriesById)
    .post('/subcategories', RouteValidator.validate, ctrl.createSubcategories)
    .patch('/subcategories', subcategoriesValidator, RouteValidator.validate, ctrl.updateSubcategories)
    .delete('/subcategories', subcategoriesValidator, RouteValidator.validate, ctrl.deleteSubcategories)
    .post('/subcategories/picture-subcategory', ctrl.setInfoSubCatUpload, uploadImageS3.single('file'), addSubcategoryImageValidator, RouteValidator.validate, ctrl.addSubcategoriesImage)
    .get('/subsubcategories', RouteValidator.validate, ctrl.fetchSubsubcategories)
    .get('/subsubcategories/id/:id', subsubcategoriesValidator, RouteValidator.validate, ctrl.getSubsubcategoriesById)
    .post('/subsubcategories', RouteValidator.validate, ctrl.createSubsubcategories)
    .patch('/subsubcategories', subsubcategoriesValidator, RouteValidator.validate, ctrl.updateSubsubcategories)
    .delete('/subsubcategories', subsubcategoriesValidator, RouteValidator.validate, ctrl.deleteSubsubcategories)
    .post('/subsubcategories/picture-subcategory', ctrl.setInfoSubCatUpload, uploadImageS3.single('file'), addSubcategoryImageValidator, RouteValidator.validate, ctrl.addSubcategoriesImage);