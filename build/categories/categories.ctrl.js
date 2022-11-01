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
            let response = await categories_service_1.default.fetchCategoriesService(body, page, limit, skip);
            const data = {
                totalItems: totalItems,
                pageLength: limit,
                numberPages: Math.ceil(totalItems / limit),
                thisPage: response[1].categories.length,
                items: response[1].categories
            };
            (0, request_handler_1.default)(res, response[0], data);
        }
        catch (error) {
            console.log(error);
            (0, request_handler_1.default)(res, 500, error);
        }
    }
    async getCategoriesById(req, res) {
        try {
            const category_id = req.params.id;
            const response = await categories_service_1.default.getCategoryService(category_id);
            (0, request_handler_1.default)(res, response[0], response[1]);
        }
        catch (error) {
            console.log(error);
            (0, request_handler_1.default)(res, 500, error);
        }
    }
    async getSubcategoriesById(req, res) {
        try {
            const subcategory_id = req.params.id;
            const response = await categories_service_1.default.getSubcategoryService(subcategory_id);
            (0, request_handler_1.default)(res, response[0], response[1]);
        }
        catch (error) {
            (0, request_handler_1.default)(res, 500, error);
        }
    }
    async getSubsubcategoriesById(req, res) {
        try {
            const subsubcategory_id = req.params.id;
            const response = await categories_service_1.default.getSubsubcategoryService(subsubcategory_id);
            (0, request_handler_1.default)(res, response[0], response[1]);
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
            console.log(response);
            (0, request_handler_1.default)(res, response[0], response[1]);
        }
        catch (error) {
            console.log(error);
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
            const category_id = req.query.category_id;
            const body = req.body;
            const response = await categories_service_1.default.updateCategory(category_id, body);
            (0, request_handler_1.default)(res, response[0], response[1]);
        }
        catch (error) {
            (0, request_handler_1.default)(res, 500, error);
        }
    }
    async updateSubcategories(req, res) {
        try {
            const subcategory_id = req.query.subcategory_id;
            const body = req.body;
            const response = await categories_service_1.default.updateSubcategory(subcategory_id, body);
            (0, request_handler_1.default)(res, response[0], response[1]);
        }
        catch (error) {
            (0, request_handler_1.default)(res, 500, error);
        }
    }
    async updateSubsubcategories(req, res) {
        try {
            const subsubcategory_id = req.query.subsubcategory_id;
            const body = req.body;
            const response = await categories_service_1.default.updateSubsubcategory(subsubcategory_id, body);
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
            const response = await categories_service_1.default.deleteCategories(category_id);
            (0, request_handler_1.default)(res, response[0], response[1]);
        }
        catch (error) {
            (0, request_handler_1.default)(res, 500, error);
        }
    }
    async setInfoUpload(req, res, next) {
        try {
            const allowedTypes = ["principal_category", "secondary_category"];
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
    async fetchSubcategories(req, res) {
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
            const totalItems = await categories_service_1.default.getSubcategoriesCount(body);
            let response = await categories_service_1.default.fetchSubcategoriesService(body, page, limit, skip);
            const data = {
                totalItems: totalItems,
                pageLength: limit,
                numberPages: Math.ceil(totalItems / limit),
                thisPage: response[1].subcategories.length,
                items: response[1].subcategories
            };
            (0, request_handler_1.default)(res, response[0], data);
        }
        catch (error) {
            (0, request_handler_1.default)(res, 500, error);
        }
    }
    async createSubcategories(req, res) {
        try {
            const body = req.body;
            body.subcategory_id = new uuid_v4_validator_1.UUIDv4().id.substring(0, 8);
            const category_id = body.category_root_id;
            const response = await categories_service_1.default.createSubcategories(body, category_id);
            (0, request_handler_1.default)(res, response[0], response[1]);
        }
        catch (error) {
            (0, request_handler_1.default)(res, 500, error);
        }
    }
    async addSubcategoriesImage(req, res) {
        try {
            const subcategory_id = req.query.subcategory_id;
            const image = req.file;
            const response = await categories_service_1.default.addSubcategoriesImage(image, subcategory_id);
            (0, request_handler_1.default)(res, response[0], response[1]);
        }
        catch (error) {
            (0, request_handler_1.default)(res, 500, error);
        }
    }
    async deleteSubcategories(req, res) {
        try {
            const category_id = req.query.category_id;
            const subcategory_id = req.query.subcategory_id;
            const response = await categories_service_1.default.deleteSubcategories(category_id, subcategory_id);
            (0, request_handler_1.default)(res, response[0], response[1]);
        }
        catch (error) {
            (0, request_handler_1.default)(res, 500, error);
        }
    }
    async setInfoSubCatUpload(req, res, next) {
        try {
            const allowedTypes = ["principal_subcategory", "secondary_subcategory"];
            const subcategory_id = req.query.subcategory_id;
            const type = req.query.type === undefined ? "" : String(req.query.type);
            if (type === "" || !allowedTypes.includes(type)) {
                (0, request_handler_1.default)(res, 500, { message: "The request is incomplete." + type });
                return false;
            }
            req.params.route_upload_s3 = 'Subcategories' + "/" + type + "/" + subcategory_id + "/";
            console.log(req.params.route_upload_s3);
            req.params.type_upload_s3 = type;
            next();
        }
        catch (error) {
            (0, request_handler_1.default)(res, 500, error);
        }
    }
    async fetchSubsubcategories(req, res) {
        try {
            console.log(12);
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
            const totalItems = await categories_service_1.default.getSubsubcategoriesCount(body);
            console.log(1);
            let response = await categories_service_1.default.fetchSubsubcategoriesService(body, page, limit, skip);
            const data = {
                totalItems: totalItems,
                pageLength: limit,
                numberPages: Math.ceil(totalItems / limit),
                thisPage: response[1].subsubcategories.length,
                items: response[1].subsubcategories
            };
            (0, request_handler_1.default)(res, response[0], data);
        }
        catch (error) {
            (0, request_handler_1.default)(res, 500, error);
        }
    }
    async createSubsubcategories(req, res) {
        try {
            const body = req.body;
            body.subsubcategory_id = new uuid_v4_validator_1.UUIDv4().id.substring(0, 8);
            const category_id = body.category_root_id;
            const subcategory_id = body.subcategory_id;
            const response = await categories_service_1.default.createSubsubcategories(body, category_id, subcategory_id);
            (0, request_handler_1.default)(res, response[0], response[1]);
        }
        catch (error) {
            (0, request_handler_1.default)(res, 500, error);
        }
    }
    async addSubsubcategoriesImage(req, res) {
        try {
            const subcategory_id = req.query.subcategory_id;
            const image = req.file;
            const response = await categories_service_1.default.addSubcategoriesImage(image, subcategory_id);
            (0, request_handler_1.default)(res, response[0], response[1]);
        }
        catch (error) {
            (0, request_handler_1.default)(res, 500, error);
        }
    }
    async deleteSubsubcategories(req, res) {
        try {
            const category_id = req.query.category_id;
            const subcategory_id = req.query.subcategory_id;
            const subsubcategory_id = req.query.subsubcategory_id;
            const body = req.body;
            let data = {
                ...body,
            };
            const response = await categories_service_1.default.deleteSubsubcategories(category_id, subcategory_id, subsubcategory_id);
            (0, request_handler_1.default)(res, response[0], response[1]);
        }
        catch (error) {
            (0, request_handler_1.default)(res, 500, error);
        }
    }
    async setInfoSubsubcategoryUpload(req, res, next) {
        try {
            const allowedTypes = ["principal_subcategory", "secondary_subcategory"];
            const subcategory_id = req.query.subcategory_id;
            const type = req.query.type === undefined ? "" : String(req.query.type);
            if (type === "" || !allowedTypes.includes(type)) {
                (0, request_handler_1.default)(res, 500, { message: "The request is incomplete." + type });
                return false;
            }
            req.params.route_upload_s3 = 'Subcategories' + "/" + type + "/" + subcategory_id + "/";
            console.log(req.params.route_upload_s3);
            req.params.type_upload_s3 = type;
            next();
        }
        catch (error) {
            (0, request_handler_1.default)(res, 500, error);
        }
    }
}
exports.default = new CategoriesCtrl;
