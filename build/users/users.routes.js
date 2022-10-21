"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminUsersRouter = void 0;
const express_1 = require("express");
const users_ctrl_1 = __importDefault(require("./users.ctrl"));
const validators_1 = __importDefault(require("../helpers/validators"));
const users_validator_1 = require("./users.validator");
exports.adminUsersRouter = (0, express_1.Router)();
exports.adminUsersRouter
    .patch('/change-password', users_validator_1.changePasswordValidator, validators_1.default.validate, users_ctrl_1.default.changePassword);
