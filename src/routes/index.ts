import { Router } from "express";
import { AuthRouter } from "../auth/auth.routes";
import { SaludosRouter } from "../saludos/saludos.routes";
import { AdminUsersRouter } from "../users/users.routes";
import { BannersRoutes } from "../banners/banners.routes";
import { ProductsRoutes } from "../products/products.routes";
import { CategoriesRoutes } from "../categories/categories.routes";
import { BrandsRoutes } from "../brands/brands.routes";
import { LaboratoriesRoutes } from "../laboratories/laboratories.routes";

export const mainRouter = Router();

mainRouter
    .use('/auth', AuthRouter)
    .use('/saludo', SaludosRouter)
    .use('/banners', BannersRoutes)
    .use('/products', ProductsRoutes)
    .use('/users', AdminUsersRouter)
    .use('/categories', CategoriesRoutes)
    .use('/brands', BrandsRoutes)
    .use('/laboratories', LaboratoriesRoutes)