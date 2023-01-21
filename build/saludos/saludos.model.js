"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SALUDOS_SCHEMA = new mongoose_1.Schema({
    saludo: {
        type: String,
        required: [true, 'Saludo is required.']
    },
    lastNames: {
        type: String,
        required: [true, 'Last names is required.']
    },
    internalId: {
        type: Number,
        required: [true, 'Last names is required.']
    }
});
exports.default = (0, mongoose_1.model)('Saludo', SALUDOS_SCHEMA);
