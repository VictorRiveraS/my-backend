"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoriesModel = void 0;
const mongoose_1 = require("mongoose");
const newsSchema = new mongoose_1.Schema({
    category_id: {
        type: String,
        required: false
    },
    category_name: {
        type: String,
        required: [true, 'Category name is required.']
    },
    category_image: {
        type: String,
        required: false
    },
    category_type: {
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
exports.categoriesModel = (0, mongoose_1.model)('categories', newsSchema);
