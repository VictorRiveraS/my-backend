import { Router } from 'express';
import ctrl from './laboratories.ctrl';
import RouteValidator from '../helpers/validators';
import { addLaboratoriesImageValidator, laboratoriesValidator } from './laboratories.validator';
import { uploadImageS3 } from '../aws-s3-bucket/upload-s3.service';

export const LaboratoriesRoutes = Router();

LaboratoriesRoutes
    .get('/', RouteValidator.validate, ctrl.fetchBrands)
    .get('/id', laboratoriesValidator, RouteValidator.validate, ctrl.getBrandsById)
    .post('/', RouteValidator.validate, ctrl.createBrands)
    .post('/picture-laboratory', ctrl.setInfoUpload, uploadImageS3.single('file'), addLaboratoriesImageValidator, RouteValidator.validate, ctrl.addBrandsImage)
    .patch('/', laboratoriesValidator, RouteValidator.validate, ctrl.updateBrands)
    .delete('/', laboratoriesValidator, RouteValidator.validate, ctrl.deleteBrands);