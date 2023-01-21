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
    product_family_friend_url: {
        type: String,
        required: false
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
    product_lab_id: {
        type: mongoose_1.Schema.Types.String, ref: 'laboratories'
    },
    product_category_id: {
        type: mongoose_1.Schema.Types.String, ref: 'categories'
    },
    product_subcategory_id: {
        type: mongoose_1.Schema.Types.String, ref: 'subcategories'
    },
    product_subsubcategory_id: {
        type: mongoose_1.Schema.Types.String, ref: 'subsubcategories'
    },
    product_brand_id: {
        type: mongoose_1.Schema.Types.String, ref: 'brands'
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
