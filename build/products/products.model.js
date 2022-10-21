"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsModel = void 0;
const mongoose_1 = require("mongoose");
const newsSchema = new mongoose_1.Schema({
    product_id: {
        type: String,
        required: false
    },
    product_name: {
        type: String,
        required: [true, 'Product name is required.']
    },
    product_lab: {
        type: String,
        required: [true, 'Product labratory is required.']
    },
    product_category: {
        type: String,
        required: [true, 'Product labratory is required.']
    },
    product_image: {
        type: String,
        required: [true, 'Product image is required.']
    },
    product_price: {
        type: Number,
        required: [true, 'Product price is required.']
    },
    product_sku: {
        type: String,
        required: [true, 'Product sku is required.']
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
exports.ProductsModel = (0, mongoose_1.model)('products', newsSchema);
