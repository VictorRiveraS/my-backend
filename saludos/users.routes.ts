import { Router } from 'express';
import ctrl from './users.ctrl';
import RouteValidator from '../helpers/validators';
import { changePasswordValidator } from './users.validator';

export const adminUsersRouter = Router();

adminUsersRouter
    .patch('/change-password', changePasswordValidator, RouteValidator.validate, ctrl.changePassword);