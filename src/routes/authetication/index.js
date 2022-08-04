import { Router } from "express";

import authorization from '../../helpers/jwt.ts';

import { AuthRouter } from "../../auth/auth.routes";
import { adminUsersRouter } from "../../users/users.routes";

export const mainRouter = Router();

mainRouter
    .use('/admin-auth', AuthRouter)
    .use('/', authorization.verifyToken)
    .use('/admin-users', adminUsersRouter);