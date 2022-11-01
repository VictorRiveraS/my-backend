"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_handler_1 = __importDefault(require("../helpers/request.handler"));
const products_service_1 = __importDefault(require("./products.service"));
const uuid_v4_validator_1 = require("uuid-v4-validator");
class ProductsCtrl {
    async fetchProducts(req, res) {
        try {
            const page = Number(req.query.page);
            const limit = Number(req.query.limit);
            let body;
            if (req.query.search) {
                const search = String(req.query.search);
                const regex = new RegExp(search, 'i');
                body = {
                    "$or": [
                        { 'id': { '$regex': regex } },
                        { 'name': { '$regex': regex } },
                    ],
                };
            }
            else {
                body = {};
            }
            const skip = (page - 1) * limit;
            const totalItems = await products_service_1.default.getProductsCount(body);
            let response = await products_service_1.default.getProductService(body, page, limit, skip);
            const data = {
                totalItems: totalItems,
                pageLength: limit,
                numberPages: Math.ceil(totalItems / limit),
                thisPage: response[1].listSegment.length,
                items: response[1].listSegment
            };
            (0, request_handler_1.default)(res, response[0], data);
        }
        catch (error) {
            (0, request_handler_1.default)(res, 500, error);
        }
    }
    async getProductsById(req, res) {
        try {
            const product_id = req.params.product_id;
            let response = await products_service_1.default.getProductByIdService(product_id);
            (0, request_handler_1.default)(res, response[0], response[1]);
        }
        catch (error) {
            (0, request_handler_1.default)(res, 500, error);
        }
    }
    async createProducts(req, res) {
        try {
            const body = req.body;
            body.product_id = new uuid_v4_validator_1.UUIDv4().id.substring(0, 8);
            const response = await products_service_1.default.createProduct(body);
            (0, request_handler_1.default)(res, response[0], response[1]);
        }
        catch (error) {
            (0, request_handler_1.default)(res, 500, error);
        }
    }
    async updateProducts(req, res) {
        try {
            delete req.body.isDeleted;
            delete req.body.tenantId;
            const product_id = req.query.product_id;
            const body = req.body;
            const response = await products_service_1.default.updateProduct(product_id, body);
            (0, request_handler_1.default)(res, response[0], response[1]);
        }
        catch (error) {
            (0, request_handler_1.default)(res, 500, error);
        }
    }
    async deleteProducts(req, res) {
        try {
            const product_id = req.query.product_id;
            const body = req.body;
            let data = {
                ...body,
            };
            const response = await products_service_1.default.deleteProduct(data, product_id);
            (0, request_handler_1.default)(res, response[0], response[1]);
        }
        catch (error) {
            (0, request_handler_1.default)(res, 500, error);
        }
    }
    async addProductImage(req, res) {
        try {
            const product_id = req.query.product_id;
            const image = req.file;
            const response = await products_service_1.default.addProductImage(image, product_id);
            (0, request_handler_1.default)(res, response[0], response[1]);
        }
        catch (error) {
            (0, request_handler_1.default)(res, 500, error);
        }
    }
    async setInfoUpload(req, res, next) {
        try {
            const allowedTypes = ["principal_product"];
            const product_id = req.query.product_id;
            const type = req.query.type === undefined ? "" : String(req.query.type);
            if (type === "" || !allowedTypes.includes(type)) {
                (0, request_handler_1.default)(res, 500, { message: "The request is incomplete." + type });
                return false;
            }
            req.params.route_upload_s3 = 'Products' + "/" + type + "/" + product_id + "/";
            req.params.type_upload_s3 = type;
            next();
        }
        catch (error) {
            (0, request_handler_1.default)(res, 500, error);
        }
    }
}
exports.default = new ProductsCtrl;
