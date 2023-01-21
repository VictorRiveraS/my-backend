import { model, Schema } from "mongoose";

export interface IProducts {
    product_id: string | null | undefined;
    product_name: string;
    product_family_friend_url: string;
    product_type_use: string;
    product_technical_info: any[];
    product_lab_id: string;
    product_category_id: string;
    product_subcategory_id?: string;
    product_subsubcategory_id?: string;
    product_brand_id: string;
    product_image: string;
    product_price: number;
    product_short_description: string;
    product_long_description: string;
    product_sku: string;
    product_stock: number;
    product_stock_status: string;
    created_at?: Date;
    updated_at?: Date;
    created_by?: string;
    updated_by?: string;
}

export interface ITechnicalInfo {
    code: string,
    label: string,
    value: string
}


const newsSchema = new Schema<IProducts>({
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
        type: Schema.Types.String, ref: 'laboratories'
    },
    product_category_id: {
        type: Schema.Types.String, ref: 'categories'
    },
    product_subcategory_id: {
        type: Schema.Types.String, ref: 'subcategories'
    },
    product_subsubcategory_id: {
        type: Schema.Types.String, ref: 'subsubcategories'
    },
    product_brand_id: {
        type: Schema.Types.String, ref: 'brands'
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


export const ProductsModel = model<IProducts>('products', newsSchema);