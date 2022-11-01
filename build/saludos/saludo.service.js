"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const saludos_model_1 = __importDefault(require("./saludos.model"));
class saludoService {
    async fecthSaludos() {
        try {
            const saludo = await saludos_model_1.default.find();
            return [201, {
                    saludo,
                    message: 'Saludos fetched.'
                }];
        }
        catch (error) {
            return [500, error];
        }
    }
    async postSaludo(newSaludo) {
        try {
            const maxIdSaludo = await saludos_model_1.default.find()?.sort({ internalId: -1 })?.limit(1);
            let maxId = 1;
            if (maxIdSaludo.length > 0)
                maxId = maxIdSaludo[0].internalId + 1;
            newSaludo.internalId = maxId;
            const newSaludoRes = await saludos_model_1.default.create(newSaludo);
            return [201, {
                    newSaludoRes,
                    message: 'Saludo created.'
                }];
        }
        catch (error) {
            return [500, error];
        }
    }
}
exports.default = new saludoService;
