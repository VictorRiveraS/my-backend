import { Router } from 'express';
import ctrl from './brands.ctrl';
import RouteValidator from '../helpers/validators';
import { addBrandsImageValidator, brandsValidator } from './brands.validator';
import { uploadImageS3 } from '../aws-s3-bucket/upload-s3.service';

export const BrandsRoutes = Router();

BrandsRoutes
    .get('/', RouteValidator.validate, ctrl.fetchBrands)
    .get('/id', brandsValidator, RouteValidator.validate, ctrl.getBrandsById)
    .post('/', RouteValidator.validate, ctrl.createBrands)
    .post('/picture-brand', ctrl.setInfoUpload, uploadImageS3.single('file'), addBrandsImageValidator, RouteValidator.validate, ctrl.addBrandsImage)
    .patch('/', brandsValidator, RouteValidator.validate, ctrl.updateBrands)
    .delete('/', brandsValidator, RouteValidator.validate, ctrl.deleteBrands);