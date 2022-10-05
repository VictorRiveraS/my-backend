import { Router } from "express";

import authorization from '../helpers/jwt';

import { AuthRouter } from "../auth/auth.routes";
import { SaludosRouter } from "../saludos/saludos.routes";
import { adminUsersRouter } from "../users/users.routes";
import { BannersRoutes } from "../banners/banners.routes";

export const mainRouter = Router();

mainRouter
    .use('/auth', AuthRouter)
    .use('/saludo', SaludosRouter)
    .use('/banners', BannersRoutes)
    .use('/users', adminUsersRouter);
