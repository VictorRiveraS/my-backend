"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_model_1 = __importDefault(require("../users/users.model"));
const bcryptjs_1 = require("bcryptjs");
const auth_service_1 = __importDefault(require("../auth/auth.service"));
class AdminUsersService {
    async changePassword(new_password, email) {
        try {
            const user = await auth_service_1.default.existUser(email);
            if (!user) {
                return [404, { error: 'User not exist.' }];
            }
            const hashNewPassword = await (0, bcryptjs_1.hash)(new_password, 10);
            await users_model_1.default.findByIdAndUpdate(user._id, { password: hashNewPassword });
            return [201, {
                    message: 'Password updated.'
                }];
        }
        catch (error) {
            return [500, error];
        }
    }
}
exports.default = new AdminUsersService;
