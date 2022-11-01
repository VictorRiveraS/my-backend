"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const saludo_service_1 = __importDefault(require("./saludo.service"));
const request_handler_1 = __importDefault(require("../helpers/request.handler"));
class saludoCtrl {
    async getAllSaludos(req, res) {
        try {
            const saludos = await saludo_service_1.default.fecthSaludos();
            (0, request_handler_1.default)(res, saludos[0], saludos[1]);
        }
        catch (error) {
            (0, request_handler_1.default)(res, 500, error);
        }
    }
    async addSaludo(req, res) {
        try {
            const newSaludo = await saludo_service_1.default.postSaludo(req.body);
            (0, request_handler_1.default)(res, newSaludo[0], newSaludo[1]);
        }
        catch (error) {
            (0, request_handler_1.default)(res, 500, error);
        }
    }
}
exports.default = new saludoCtrl;
