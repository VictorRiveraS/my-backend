"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannersModel = void 0;
const mongoose_1 = require("mongoose");
const newsSchema = new mongoose_1.Schema({
    banner_id: {
        type: String,
        required: false
    },
    banner_name: {
        type: String,
        required: [true, 'Banners name is required.']
    },
    banner_image: {
        type: String,
        required: false
    },
    banner_link: {
        type: String,
        required: false
    },
    banner_type: {
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
exports.BannersModel = (0, mongoose_1.model)('banners', newsSchema);
