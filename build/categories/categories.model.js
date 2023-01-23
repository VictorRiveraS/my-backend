"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subsubcategoriesModel = exports.subcategoriesModel = exports.categoriesModel = void 0;
const mongoose_1 = require("mongoose");
const newsSchemaCategories = new mongoose_1.Schema({
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
        required: true
    },
    category_subcategory: {
        type: [
            {
                subcategory_id: {
                    type: String,
                    required: false
                },
                subcategory_name: {
                    type: String,
                    required: false
                },
                category_subsubcategory: {
                    type: [
                        {
                            subsubcategory_id: {
                                type: String,
                                required: false
                            },
                            subsubcategory_name: {
                                type: String,
                                required: false
                            }
                        }
                    ],
                    required: false
                },
            }
        ],
        required: false
    },
    subcategories: [
        {
            type: mongoose_1.Schema.Types.ObjectId, ref: 'subcategories'
        }
    ],
    products: [
        {
            type: mongoose_1.Schema.Types.ObjectId, ref: 'products'
        }
    ],
    laboratories: [
        {
            type: mongoose_1.Schema.Types.ObjectId, ref: 'laboratories'
        }
    ],
    brands: [
        {
            type: mongoose_1.Schema.Types.ObjectId, ref: 'brands'
        }
    ],
    isActive: {
        type: Boolean,
        required: true
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
const newsSchemaSubcategories = new mongoose_1.Schema({
    subcategory_id: {
        type: String,
        required: false
    },
    subcategory_name: {
        type: String,
        required: [true, 'Subcategory name is required.']
    },
    subcategory_image: {
        type: String,
        required: false
    },
    subcategory_type: {
        type: String,
        required: true
    },
    category_root: {
        type: mongoose_1.Schema.Types.String, ref: 'subcategories'
    },
    category_root_id: {
        type: String,
        required: true
    },
    category_subsubcategory: {
        type: [
            {
                subsubcategory_id: {
                    type: String,
                    required: false
                },
                subsubcategory_name: {
                    type: String,
                    required: false
                }
            }
        ],
        required: false
    },
    subsubcategories: [
        {
            type: mongoose_1.Schema.Types.ObjectId, ref: 'subsubcategories'
        }
    ],
    products: [
        {
            type: mongoose_1.Schema.Types.ObjectId, ref: 'products'
        }
    ],
    laboratories: [
        {
            type: mongoose_1.Schema.Types.ObjectId, ref: 'laboratories'
        }
    ],
    brands: [
        {
            type: mongoose_1.Schema.Types.ObjectId, ref: 'brands'
        }
    ],
    isActive: {
        type: Boolean,
        required: true
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
const newsSchemaSubSubcategories = new mongoose_1.Schema({
    subsubcategory_id: {
        type: String,
        required: false
    },
    subsubcategory_name: {
        type: String,
        required: [true, 'Subcategory name is required.']
    },
    subsubcategory_image: {
        type: String,
        required: false
    },
    subsubcategory_type: {
        type: String,
        required: true
    },
    category_root: {
        type: mongoose_1.Schema.Types.String, ref: 'subcategories'
    },
    category_root_id: {
        type: String,
        required: true
    },
    subcategory: {
        type: mongoose_1.Schema.Types.String, ref: 'subcategories'
    },
    subcategory_id: {
        type: String,
        required: true
    },
    products: [
        {
            type: mongoose_1.Schema.Types.ObjectId, ref: 'products'
        }
    ],
    laboratories: [
        {
            type: mongoose_1.Schema.Types.ObjectId, ref: 'laboratories'
        }
    ],
    brands: [
        {
            type: mongoose_1.Schema.Types.ObjectId, ref: 'brands'
        }
    ],
    isActive: {
        type: Boolean,
        required: true
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
exports.categoriesModel = (0, mongoose_1.model)('categories', newsSchemaCategories);
exports.subcategoriesModel = (0, mongoose_1.model)('subcategories', newsSchemaSubcategories);
exports.subsubcategoriesModel = (0, mongoose_1.model)('subsubcategories', newsSchemaSubSubcategories);
