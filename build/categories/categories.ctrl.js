"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_handler_1 = __importDefault(require("../helpers/request.handler"));
const categories_service_1 = __importDefault(require("./categories.service"));
const uuid_v4_validator_1 = require("uuid-v4-validator");
class CategoriesCtrl {
    async fetchCategories(req, res) {
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
            const totalItems = await categories_service_1.default.getCategoriesCount(body);
            let response = await categories_service_1.default.getCategoriesService(body, page, limit, skip);
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
    async getCategoriesById(req, res) {
        try {
            /*  const response = await service.forgotPassword(req.body.email);
             Handler(res, response[0], response[1]); */
        }
        catch (error) {
            (0, request_handler_1.default)(res, 500, error);
        }
    }
    async createCategories(req, res) {
        try {
            const body = req.body;
            body.category_id = new uuid_v4_validator_1.UUIDv4().id.substring(0, 8);
            const response = await categories_service_1.default.createCategories(body);
            (0, request_handler_1.default)(res, response[0], response[1]);
        }
        catch (error) {
            (0, request_handler_1.default)(res, 500, error);
        }
    }
    async addCategoriesImage(req, res) {
        try {
            const category_id = req.query.category_id;
            const image = req.file;
            const response = await categories_service_1.default.addCategoriesImage(image, category_id);
            (0, request_handler_1.default)(res, response[0], response[1]);
        }
        catch (error) {
            (0, request_handler_1.default)(res, 500, error);
        }
    }
    async updateCategories(req, res) {
        try {
            delete req.body.isDeleted;
            delete req.body.tenantId;
            const category_id = req.query.category_id;
            const body = req.body;
            const response = await categories_service_1.default.updateCategory(category_id, body);
            (0, request_handler_1.default)(res, response[0], response[1]);
        }
        catch (error) {
            (0, request_handler_1.default)(res, 500, error);
        }
    }
    async deleteCategories(req, res) {
        try {
            const category_id = req.query.category_id;
            const body = req.body;
            let data = {
                ...body,
            };
            const response = await categories_service_1.default.deleteCategories(data, category_id);
            (0, request_handler_1.default)(res, response[0], response[1]);
        }
        catch (error) {
            (0, request_handler_1.default)(res, 500, error);
        }
    }
    async setInfoUpload(req, res, next) {
        try {
            const allowedTypes = ["principal_category", "secundary_category"];
            const category_id = req.query.category_id;
            const type = req.query.type === undefined ? "" : String(req.query.type);
            if (type === "" || !allowedTypes.includes(type)) {
                (0, request_handler_1.default)(res, 500, { message: "The request is incomplete." + type });
                return false;
            }
            req.params.route_upload_s3 = 'Categories' + "/" + type + "/" + category_id + "/";
            req.params.type_upload_s3 = type;
            next();
        }
        catch (error) {
            (0, request_handler_1.default)(res, 500, error);
        }
    }
}
exports.default = new CategoriesCtrl;
