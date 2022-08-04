"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.URL = exports.DEST_FOLDER = exports.EMAIL_PORT = exports.EMAIL_HOST = exports.EMAIL_PASS = exports.EMAIL_USER = exports.JWT_SECRET = exports.MONGO_URI = exports.TIME_ZONE = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = require("path");
dotenv_1.default.config({ path: (0, path_1.join)(__dirname, '../../', `.env.${process.env.NODE_ENV || 'local'}`) });
exports.PORT = process.env.PORT;
exports.TIME_ZONE = process.env.TIME_ZONE;
exports.MONGO_URI = process.env.MONGO_URI;
exports.JWT_SECRET = process.env.JWT_SECRET;
exports.EMAIL_USER = process.env.EMAIL_USER;
exports.EMAIL_PASS = process.env.EMAIL_PASS;
exports.EMAIL_HOST = process.env.EMAIL_HOST;
exports.EMAIL_PORT = process.env.EMAIL_PORT;
exports.DEST_FOLDER = process.env.DEST_FOLDER;
exports.URL = process.env.URL;
