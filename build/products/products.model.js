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
    product_technical_info: {
        type: [
            {
                code: {
                    type: String,
                    required: false
                },
                label: {
                    type: String,
                    required: false
                },
                value: {
                    type: String,
                    required: false
                }
            }
        ],
        required: false
    },
    product_lab: {
        type: String,
        required: [true, 'Product laboratory is required.']
    },
    product_lab_id: {
        type: String,
        required: [true, 'Product laboratory id is required.']
    },
    product_category: {
        type: String,
        required: [true, 'Product category is required.']
    },
    product_category_id: {
        type: String,
        required: [true, 'Product category id is required.']
    },
    product_subcategory: {
        type: String,
        required: [true, 'Product subcategory is required.']
    },
    product_subcategory_id: {
        type: String,
        required: [true, 'Product subcategory id is required.']
    },
    product_brand: {
        type: String,
        required: [true, 'Product brand is required.']
    },
    product_brand_id: {
        type: String,
        required: [true, 'Product brand id is required.']
    },
    product_image: {
        type: String,
        required: [true, 'Product image is required.']
    },
    product_price: {
        type: Number,
        required: [true, 'Product price is required.']
    },
    product_short_description: {
        type: String,
        required: [true, 'Product short description is required.']
    },
    product_long_description: {
        type: String,
        required: [true, 'Product long description is required.']
    },
    product_sku: {
        type: String,
        required: [true, 'Product sku is required.']
    },
    product_stock: {
        type: Number,
        required: [true, 'Product stock is required.']
    },
    product_stock_status: {
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
exports.ProductsModel = (0, mongoose_1.model)('products', newsSchema);
