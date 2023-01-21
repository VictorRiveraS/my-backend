"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.laboratoriesModel = void 0;
const mongoose_1 = require("mongoose");
const newsSchema = new mongoose_1.Schema({
    laboratory_id: {
        type: String,
        required: false
    },
    laboratory_name: {
        type: String,
        required: [true, 'Laboratory name is required.']
    },
    laboratory_image: {
        type: String,
        required: false
    },
    created_by: {
        type: String,
    },
    updated_by: {
        type: String,
    }
}, {
    timestamps: {
        createdAt: 'created_At',
        updatedAt: 'updated_At',
    }
});
exports.laboratoriesModel = (0, mongoose_1.model)('laboratories', newsSchema);
