"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const express_1 = require("express");
const auth_ctrl_1 = __importDefault(require("./auth.ctrl"));
const auth_validator_1 = require("./auth.validator");
const validators_1 = __importDefault(require("../helpers/validators"));
exports.AuthRouter = (0, express_1.Router)();
exports.AuthRouter
    .post('/login', auth_validator_1.loginValidator, validators_1.default.validate, auth_ctrl_1.default.signin)
    .post('/forgot-password', auth_validator_1.forgotPasswordValidator, validators_1.default.validate, auth_ctrl_1.default.forgotPassword)
    .patch('/reset-password', auth_validator_1.resetPasswordValidator, validators_1.default.validate, auth_ctrl_1.default.resetPassword);
