import { Router } from 'express';
import ctrl from './auth.ctrl';
import { loginValidator, forgotPasswordValidator, resetPasswordValidator } from './auth.validator';
import RouteValidator from '../helpers/validators';

export const AuthRouter = Router();

AuthRouter
    .post('/login', loginValidator, RouteValidator.validate, ctrl.signin)
    .post('/forgot-password', forgotPasswordValidator, RouteValidator.validate, ctrl.forgotPassword)
    .patch('/reset-password', resetPasswordValidator, RouteValidator.validate, ctrl.resetPassword);