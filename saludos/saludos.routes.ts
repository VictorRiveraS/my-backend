import { Router } from 'express';
import ctrl from './saludos.ctrl';
import RouteValidator from '../helpers/validators';
import { fetchAllSaludos } from './saludos.validator';

export const SaludosRouter = Router();

SaludosRouter
    .get('/', RouteValidator.validate, ctrl.getAllSaludos)
    .get('/:id', fetchAllSaludos, RouteValidator.validate, ctrl.getAllSaludos)
    .post('/', fetchAllSaludos, RouteValidator.validate, ctrl.addSaludo)
    .patch('/:id', fetchAllSaludos, RouteValidator.validate, ctrl.getAllSaludos)
    .delete('/:id', fetchAllSaludos, RouteValidator.validate, ctrl.getAllSaludos);
