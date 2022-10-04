import { Router } from 'express';
import ctrl from './banners.ctrl';
import { loginValidator, forgotPasswordValidator, resetPasswordValidator } from './banners.validator';
import RouteValidator from '../helpers/validators';

export const BannersRoutes = Router();

BannersRoutes
    .get('/', loginValidator, RouteValidator.validate, ctrl.signin)
    .get('/id', forgotPasswordValidator, RouteValidator.validate, ctrl.forgotPassword)
    .post('/', resetPasswordValidator, RouteValidator.validate, ctrl.resetPassword)
    .patch('/', resetPasswordValidator, RouteValidator.validate, ctrl.resetPassword)
    .delete('/', resetPasswordValidator, RouteValidator.validate, ctrl.resetPassword);