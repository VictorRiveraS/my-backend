"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.brandsModel = void 0;
const mongoose_1 = require("mongoose");
const newsSchema = new mongoose_1.Schema({
    brand_id: {
        type: String,
        required: false
    },
    brand_name: {
        type: String,
        required: [true, 'Brand name is required.']
    },
    brand_image: {
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
exports.brandsModel = (0, mongoose_1.model)('brands', newsSchema);
