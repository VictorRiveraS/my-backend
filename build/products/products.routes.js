"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsRoutes = void 0;
const express_1 = require("express");
const products_ctrl_1 = __importDefault(require("./products.ctrl"));
const validators_1 = __importDefault(require("../helpers/validators"));
const products_validator_1 = require("./products.validator");
exports.ProductsRoutes = (0, express_1.Router)();
exports.ProductsRoutes
    .get('/', validators_1.default.validate, products_ctrl_1.default.fetchProducts)
    .get('/:product_id', products_validator_1.productValidator, validators_1.default.validate, products_ctrl_1.default.getProductsById)
    .post('/', validators_1.default.validate, products_ctrl_1.default.createProducts)
    .patch('/', products_validator_1.productValidator, validators_1.default.validate, products_ctrl_1.default.updateProducts)
    .delete('/', products_validator_1.productValidator, validators_1.default.validate, products_ctrl_1.default.deleteProducts);
