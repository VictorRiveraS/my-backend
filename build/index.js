"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const express_1 = __importDefault(require("express"));
const env_1 = require("./config/env");
const logger_js_1 = __importDefault(require("./lib/logger.js"));
const index_1 = require("./routes/index");
const database_1 = __importDefault(require("./config/database"));
const error_handler_js_1 = __importDefault(require("./lib/error.handler.js"));
const httpReqLogFormat = ':method :url :status :res[content-length] - :response-time ms';
const httpReqLogger = (0, morgan_1.default)(httpReqLogFormat, { stream: logger_js_1.default.stream });
const app = (0, express_1.default)();
const port = process.env.PORT || 80;
// middlewares
app.use(express_1.default.json({ limit: '50mb' }));
app.use((0, cors_1.default)());
app.use(httpReqLogger);
app.use(error_handler_js_1.default);
app.use('/api', index_1.mainRouter);
database_1.default.connect();
app.listen(port, () => {
    console.log(`Server running on port ${env_1.PORT}`);
});
