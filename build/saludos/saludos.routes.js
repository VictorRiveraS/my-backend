"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaludosRouter = void 0;
const express_1 = require("express");
const saludos_ctrl_1 = __importDefault(require("./saludos.ctrl"));
const validators_1 = __importDefault(require("../helpers/validators"));
const saludos_validator_1 = require("./saludos.validator");
exports.SaludosRouter = (0, express_1.Router)();
exports.SaludosRouter
    .get('/', validators_1.default.validate, saludos_ctrl_1.default.getAllSaludos)
    .get('/:id', saludos_validator_1.fetchAllSaludos, validators_1.default.validate, saludos_ctrl_1.default.getAllSaludos)
    .post('/', saludos_validator_1.fetchAllSaludos, validators_1.default.validate, saludos_ctrl_1.default.addSaludo)
    .patch('/:id', saludos_validator_1.fetchAllSaludos, validators_1.default.validate, saludos_ctrl_1.default.getAllSaludos)
    .delete('/:id', saludos_validator_1.fetchAllSaludos, validators_1.default.validate, saludos_ctrl_1.default.getAllSaludos);
