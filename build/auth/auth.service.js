"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_1 = __importDefault(require("../helpers/jwt"));
const users_model_1 = __importDefault(require("../users/users.model"));
const bcryptjs_1 = require("bcryptjs");
class AdminAuthService {
    async signin(body) {
        try {
            let { email, password } = body;
            const existUser = await this.existUser(email);
            if (!existUser) {
                return [400, { error: 'Invalid credentials' }];
            }
            const comparePass = existUser ? await (0, bcryptjs_1.compare)(password, existUser.password) : false;
            if (!comparePass) {
                return [400, { error: 'Invalid credentials' }];
            }
            const sign = await this.signJWT(existUser);
            const token = {
                jwt: sign
            };
            return [201, { token }];
        }
        catch (error) {
            return [500, { error }];
        }
    }
    async signJWT(userData) {
        let encodedData = {
            id: userData._id,
            email: userData.email,
            name: userData.name,
            rol: userData.rol,
            birth_date: userData.birth_date,
            created_at: userData.created_at,
            updated_at: userData.updated_at,
            last_name: userData.last_name,
        };
        const token = jwt_1.default.sign(encodedData, '1h');
        return token;
    }
    async existUser(email) {
        try {
            const user = await users_model_1.default.findOne({ email });
            if (user === null || !user.status) {
                return false;
            }
            return user;
        }
        catch (error) {
            return false;
        }
    }
    async forgotPassword(email) {
        try {
            const existUser = await this.existUser(email);
            if (!existUser) {
                return [404, { error: 'The email does not exist or is not registered.' }];
            }
            const token = jwt_1.default.sign('reset', '5m');
            /*    const send = new MailHelper(
                   email,
                   'Recupera tu contraseña',
                   `Click here to set a new password: ${URL}/auth/reset?token=${token}&email=${email}`,
                   EMAIL_USER,
                   'reset-password',
                   {
                       "URL_FB": 'www.facebook.com',
                       "URL_INSTAGRAM": 'www.facebook.com',
                       "URL_TWITTER": 'www.facebook.com',
                       "URL_WHATSAPP": 'www.facebook.com',
                       "SITEURL": `${URL}/auth/reset?token=${token}&email=${email}`,
                   }
               );
               const mail_status = await send.sendMailWithTemplate(); */
            return [201, {
                    message: 'Reset password mail successfully sent.',
                    /*                 mail_accepted: mail_status?.accepted?.length > 0 ? true : false
                     */ 
                }];
        }
        catch (error) {
            return [500, error];
        }
    }
    async resetPassword(new_password, email) {
        try {
            const user = await this.existUser(email);
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
exports.default = new AdminAuthService;
