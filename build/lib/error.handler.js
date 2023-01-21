"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_js_1 = __importDefault(require("./logger.js"));
exports.default = (error, req, res, next) => {
    logger_js_1.default.error(error.message || error);
    res.status(error.status || 500).json({
        message: error.message || 'Unexpected Server Error',
    });
};
