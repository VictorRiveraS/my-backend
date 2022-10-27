import { Router } from 'express';
import ctrl from './products.ctrl';
import RouteValidator from '../helpers/validators';
import { addProductImageValidator, productValidator } from './products.validator';
import { uploadImageS3 } from '../aws-s3-bucket/upload-s3.service';

export const ProductsRoutes = Router();

ProductsRoutes
    .get('/', RouteValidator.validate, ctrl.fetchProducts)
    .get('/:product_id', productValidator, RouteValidator.validate, ctrl.getProductsById)
    .post('/', RouteValidator.validate, ctrl.createProducts)
    .post('/picture-product', ctrl.setInfoUpload, uploadImageS3.single('image'), addProductImageValidator, RouteValidator.validate, ctrl.addProductImage)
    .patch('/', productValidator, RouteValidator.validate, ctrl.updateProducts)
    .delete('/', productValidator, RouteValidator.validate, ctrl.deleteProducts);