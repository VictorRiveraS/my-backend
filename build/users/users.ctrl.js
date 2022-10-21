"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_handler_1 = __importDefault(require("../helpers/request.handler"));
const users_service_1 = __importDefault(require("../users/users.service"));
class AdminUsersCtrl {
    async changePassword(req, res) {
        try {
            let { email } = req.query;
            email = String(email).replace(' ', '+');
            const response = await users_service_1.default.changePassword(req.body.new_password, String(email));
            (0, request_handler_1.default)(res, response[0], response[1]);
        }
        catch (error) {
            (0, request_handler_1.default)(res, 500, error);
        }
    }
}
exports.default = new AdminUsersCtrl;
