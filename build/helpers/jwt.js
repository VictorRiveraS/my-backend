"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
const handlers_1 = require("../helpers/handlers");
const request_handler_1 = __importDefault(require("../helpers/request.handler"));
const jsonwebtoken_2 = require("jsonwebtoken");
const envelop_1 = require("./envelop");
class Jwt {
    sign(data, expiresIn) {
        const token = jsonwebtoken_1.default.sign({
            ...data,
        }, env_1.JWT_SECRET, { algorithm: 'HS256', expiresIn });
        return token;
    }
    async verifyToken(req, res, next) {
        try {
            const token = (req.headers.authorization) ? (req.headers.authorization).replace('Bearer ', '') : undefined;
            if (token && env_1.JWT_SECRET) {
                const isValid = Jwt.verifyJWTS({ token, secret: env_1.JWT_SECRET });
                if (isValid)
                    return next();
            }
            throw new Error('401');
        }
        catch (error) {
            (0, request_handler_1.default)(res, error.message, { message: 'Unnauthorized' });
        }
    }
    verifyJWT(verifyData) {
        try {
            (0, jsonwebtoken_2.verify)(String(verifyData.token), String(verifyData.secret));
            return true;
        }
        catch (error) {
            return false;
        }
    }
    static verifyJWTS(verifyData) {
        try {
            (0, jsonwebtoken_2.verify)(String(verifyData.token), String(verifyData.secret));
            return true;
        }
        catch (error) {
            return false;
        }
    }
    async signToken(email, id) {
        const token = jsonwebtoken_1.default.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60 * 12),
            data: { email, id }
        }, env_1.JWT_SECRET, { algorithm: 'HS256' });
        return Buffer.from(token).toString('base64');
    }
    decode(token) {
        const decoded = jsonwebtoken_1.default.decode(token.replace('Bearer ', ''));
        return decoded;
    }
    async tokenAuth(req, res, next) {
        const data = req.headers.authorization ? req.headers.authorization?.replace('Bearer ', '') : '';
        try {
            jsonwebtoken_1.default.verify(Buffer.from(data, 'base64').toString('utf-8'), env_1.JWT_SECRET);
            next();
        }
        catch (error) {
            const resError = handlers_1.Handlers.errorHandler({ error: 'Unauthorized.', err: error }, 'UNAUTHORIZED');
            res.status(resError.code).json((0, envelop_1.envelope)(resError.data));
        }
    }
    getUserId(token) {
        try {
            const { id } = this.decode(token);
            if (id) {
                return id;
            }
            return null;
        }
        catch (error) {
            return error;
        }
    }
    getProp(token, prop) {
        try {
            const decoded = (this.decode(token.replace('Bearer ', '')))[`${prop}`];
            if (decoded) {
                return decoded;
            }
            return null;
        }
        catch (error) {
            return error;
        }
    }
}
exports.default = new Jwt();
