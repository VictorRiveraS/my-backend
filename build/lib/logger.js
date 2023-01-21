"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const winston_1 = __importDefault(require("winston"));
const { timestamp, label, combine, json } = winston_1.default.format;
const logDir = `${path_1.default.resolve('./')}/logs`;
const logger = winston_1.default.createLogger({
    format: combine(label({ label: 'jv-confort' }), timestamp(), json()),
    transports: [
        new winston_1.default.transports.Console({ handleExceptions: true }),
        new winston_1.default.transports.File({ filename: `${logDir}/combined.log` }),
    ],
});
logger.stream = {
    write: (message, encoding) => {
        logger.info(message);
    },
};
exports.default = logger;
