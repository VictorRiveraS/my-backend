import { Router } from 'express';
import ctrl from './laboratories.ctrl';
import RouteValidator from '../helpers/validators';
import { addLaboratoriesImageValidator, laboratoriesValidator } from './laboratories.validator';
import { uploadImageS3 } from '../aws-s3-bucket/upload-s3.service';

export const LaboratoriesRoutes = Router();

LaboratoriesRoutes
    .get('/', RouteValidator.validate, ctrl.fetchLaboratories)
    .get('/id', laboratoriesValidator, RouteValidator.validate, ctrl.getLaboratoryById)
    .post('/', RouteValidator.validate, ctrl.createLaboratory)
    .post('/picture-laboratory', ctrl.setInfoUpload, uploadImageS3.single('file'), addLaboratoriesImageValidator, RouteValidator.validate, ctrl.addLaboratoryImage)
    .patch('/', laboratoriesValidator, RouteValidator.validate, ctrl.updateLaboratory)
    .delete('/', laboratoriesValidator, RouteValidator.validate, ctrl.deleteLaboratory);