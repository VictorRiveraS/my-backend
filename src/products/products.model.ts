import { model, Schema } from "mongoose";

export interface IProducts {
    product_id: string | null | undefined;
    product_name: string;
    product_lab: string;
    product_category: string;
    product_image: string;
    product_price: number;
    product_sku: string;
    created_at?: Date;
    updated_at?: Date;
    created_by?: string;
    updated_by?: string;
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


export const ProductsModel = model<IProducts>('products', newsSchema);