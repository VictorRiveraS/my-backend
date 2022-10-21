"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_handler_1 = __importDefault(require("../helpers/request.handler"));
const auth_service_1 = __importDefault(require("./auth.service"));
const env_1 = require("../config/env");
const jwt_1 = __importDefault(require("../helpers/jwt"));
class AdminAuthCtrl {
    async signin(req, res) {
        try {
            const signin = await auth_service_1.default.signin(req.body);
            (0, request_handler_1.default)(res, signin[0], signin[1]);
        }
        catch (error) {
            (0, request_handler_1.default)(res, 500, error);
        }
    }
    async forgotPassword(req, res) {
        try {
            const response = await auth_service_1.default.forgotPassword(req.body.email);
            (0, request_handler_1.default)(res, response[0], response[1]);
        }
        catch (error) {
            (0, request_handler_1.default)(res, 500, error);
        }
    }
    async resetPassword(req, res) {
        try {
            let { token, email } = req.query;
            email = String(email).replace(' ', '+');
            const isValidToken = jwt_1.default.verifyJWT({ token: String(token), secret: env_1.JWT_SECRET });
            if (!isValidToken) {
                return (0, request_handler_1.default)(res, 401, { error: 'Token expired.' });
            }
            const response = await auth_service_1.default.resetPassword(req.body.new_password, String(email));
            (0, request_handler_1.default)(res, response[0], response[1]);
        }
        catch (error) {
            (0, request_handler_1.default)(res, 500, error);
        }
    }
}
exports.default = new AdminAuthCtrl;
