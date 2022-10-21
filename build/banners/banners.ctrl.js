"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_handler_1 = __importDefault(require("../helpers/request.handler"));
const banners_service_1 = __importDefault(require("./banners.service"));
const uuid_v4_validator_1 = require("uuid-v4-validator");
class BannersCtrl {
    async fetchBanners(req, res) {
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
            const totalItems = await banners_service_1.default.getBannersCount(body);
            let response = await banners_service_1.default.getBannersService(body, page, limit, skip);
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
    async getBannerById(req, res) {
        try {
            /*  const response = await service.forgotPassword(req.body.email);
             Handler(res, response[0], response[1]); */
        }
        catch (error) {
            (0, request_handler_1.default)(res, 500, error);
        }
    }
    async createBanner(req, res) {
        try {
            const body = req.body;
            body.banner_id = new uuid_v4_validator_1.UUIDv4().id.substring(0, 8);
            const response = await banners_service_1.default.createBanner(body);
            (0, request_handler_1.default)(res, response[0], response[1]);
        }
        catch (error) {
            (0, request_handler_1.default)(res, 500, error);
        }
    }
    async addNewsImage(req, res) {
        try {
            const banner_id = req.query.banner_id;
            const image = req.file;
            const response = await banners_service_1.default.addBannersImage(image, banner_id);
            (0, request_handler_1.default)(res, response[0], response[1]);
        }
        catch (error) {
            (0, request_handler_1.default)(res, 500, error);
        }
    }
    async updateBanner(req, res) {
        try {
            delete req.body.isDeleted;
            delete req.body.tenantId;
            const banner_id = req.query.banner_id;
            const body = req.body;
            const response = await banners_service_1.default.updateBanner(banner_id, body);
            (0, request_handler_1.default)(res, response[0], response[1]);
        }
        catch (error) {
            (0, request_handler_1.default)(res, 500, error);
        }
    }
    async deleteBanner(req, res) {
        try {
            const banner_id = req.query.banner_id;
            const body = req.body;
            let data = {
                ...body,
            };
            const response = await banners_service_1.default.deleteBanner(data, banner_id);
            (0, request_handler_1.default)(res, response[0], response[1]);
        }
        catch (error) {
            (0, request_handler_1.default)(res, 500, error);
        }
    }
    async setInfoUpload(req, res, next) {
        try {
            const allowedTypes = ["principal_banner", "brand_banner"];
            const banner_id = req.query.banner_id;
            const type = req.query.type === undefined ? "" : String(req.query.type);
            if (type === "" || !allowedTypes.includes(type)) {
                (0, request_handler_1.default)(res, 500, { message: "The request is incomplete." + type });
                return false;
            }
            req.params.route_upload_s3 = 'Banners' + "/" + type + "/" + banner_id + "/";
            req.params.type_upload_s3 = type;
            next();
        }
        catch (error) {
            (0, request_handler_1.default)(res, 500, error);
        }
    }
}
exports.default = new BannersCtrl;
