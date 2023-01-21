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
const upload_s3_service_1 = require("../aws-s3-bucket/upload-s3.service");
exports.ProductsRoutes = (0, express_1.Router)();
exports.ProductsRoutes
    .get('/', validators_1.default.validate, products_ctrl_1.default.fetchProducts)
    .get('/:product_id', products_validator_1.productValidator, validators_1.default.validate, products_ctrl_1.default.getProductsById)
    .post('/by-category/:category_id', products_validator_1.productCategoryValidator, validators_1.default.validate, products_ctrl_1.default.getProductsByCategory)
    .post('/', validators_1.default.validate, products_ctrl_1.default.createProducts)
    .post('/picture-product', products_ctrl_1.default.setInfoUpload, upload_s3_service_1.uploadImageS3.single('image'), products_validator_1.addProductImageValidator, validators_1.default.validate, products_ctrl_1.default.addProductImage)
    .patch('/', products_validator_1.productValidator, validators_1.default.validate, products_ctrl_1.default.updateProducts)
    .delete('/', products_validator_1.productValidator, validators_1.default.validate, products_ctrl_1.default.deleteProducts);
