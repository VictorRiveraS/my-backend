"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRouter = void 0;
const express_1 = require("express");
const auth_routes_1 = require("../auth/auth.routes");
const saludos_routes_1 = require("../saludos/saludos.routes");
const users_routes_1 = require("../users/users.routes");
const banners_routes_1 = require("../banners/banners.routes");
const products_routes_1 = require("../products/products.routes");
const categories_routes_1 = require("../categories/categories.routes");
const brands_routes_1 = require("../brands/brands.routes");
const laboratories_routes_1 = require("../laboratories/laboratories.routes");
exports.mainRouter = (0, express_1.Router)();
exports.mainRouter
    .use('/auth', auth_routes_1.AuthRouter)
    .use('/saludo', saludos_routes_1.SaludosRouter)
    .use('/banners', banners_routes_1.BannersRoutes)
    .use('/products', products_routes_1.ProductsRoutes)
    .use('/users', users_routes_1.AdminUsersRouter)
    .use('/categories', categories_routes_1.CategoriesRoutes)
    .use('/brands', brands_routes_1.BrandsRoutes)
    .use('/laboratories', laboratories_routes_1.LaboratoriesRoutes);
