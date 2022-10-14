import { Router } from 'express';
import ctrl from './products.ctrl';
import RouteValidator from '../helpers/validators';
import { productValidator } from './products.validator';

export const ProductsRoutes = Router();

ProductsRoutes
    .get('/', RouteValidator.validate, ctrl.fetchProducts)
    .get('/:product_id', productValidator, RouteValidator.validate, ctrl.getProductsById)
    .post('/', RouteValidator.validate, ctrl.createProducts)
    .patch('/', productValidator, RouteValidator.validate, ctrl.updateProducts)
    .delete('/', productValidator, RouteValidator.validate, ctrl.deleteProducts);