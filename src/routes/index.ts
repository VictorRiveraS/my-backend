/* import { Router } from 'express'
import saludosRoutes from './authetication/index'

const router = Router()

router.use('/api/saludo', saludosRoutes)
router.use('/api/auth', AuthRouter) 

export default router*/

import { Router } from "express";

import authorization from '../helpers/jwt';

import { AuthRouter } from "../auth/auth.routes";
import { SaludosRouter } from "../saludos/saludos.routes";
import { adminUsersRouter } from "../users/users.routes";
import { BannersRoutes } from "../banners/banners.routes";
import { ProductsRoutes } from "../products/products.routes";

export const mainRouter = Router();

mainRouter
    .use('/auth', AuthRouter)
    .use('/saludo', SaludosRouter)
    .use('/banners', BannersRoutes)
    .use('/products', ProductsRoutes)
    //.use('/', authorization.verifyToken)
    .use('/users', adminUsersRouter);