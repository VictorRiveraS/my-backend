import { model, Schema } from "mongoose";

export interface ICategories {
    category_id: string | null | undefined;
    category_name: string;
    category_image: string;
    category_type: string;
    category_brands?: Array<ICategoriesBrands>;
    category_subcategory?: Array<ICategoriesSubcategories>;
    created_at?: Date;
    updated_at?: Date;
    created_by?: string;
    updated_by?: string;
}

export interface ICategoriesBrands {
    brand_id: string;
    brand_name: string;
}

export interface ICategoriesLaboratory {
    laboratory_id: string;
    laboratory_name: string;
}

export interface ICategoriesSubcategories {
    subcategory_id: string;
    subcategory_name: string;
}

export interface ISubcategories {
    subcategory_id: string | null | undefined;
    subcategory_name: string;
    subcategory_image: string;
    subcategory_type: string;
    subcategory_brands: Array<ICategoriesBrands>;
    subcategory_laboratory: Array<ICategoriesLaboratory>;
    subcategory_category: Array<ISubcategoriesCategories>;
    created_at?: Date;
    updated_at?: Date;
    created_by?: string;
    updated_by?: string;
}

export interface ISubcategoriesCategories {
    category_id: string;
    category_name: string;
}

const newsSchemaSubcategories = new Schema<ISubcategories>(
    {
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
        subcategory_brands: {
            type: [
                {
                    brand_id: {
                        type: String,
                        required: false
                    },
                    brand_name: {
                        type: String,
                        required: false
                    }
                }
            ],
            required: false
        },
        subcategory_laboratory: {
            type: [
                {
                    laboratory_id: {
                        type: String,
                        required: false
                    },
                    laboratory_name: {
                        type: String,
                        required: false
                    }
                }
            ],
            required: false
        },
        subcategory_category: [
            {
                category_id: {
                    type: String,
                    required: false
                },
                category_name: {
                    type: String,
                    required: false
                },
            }
        ],
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
}
);

const newsSchemaCategories = new Schema<ICategories>(
    {
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
                    }
                }
            ],
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
}
);

export const categoriesModel = model<ICategories>('categories', newsSchemaCategories);
export const subcategoriesModel = model<ISubcategories>('subcategories', newsSchemaSubcategories);