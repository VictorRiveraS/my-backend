import { model, Schema } from "mongoose";

export interface IBrands {
    brand_id: string | null | undefined;
    brand_name: string;
    brand_image: string;
    brand_type: string;
    created_at?: Date;
    updated_at?: Date;
    created_by?: string;
    updated_by?: string;
}

const newsSchema = new Schema<IBrands>(
    {
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
        brand_type: {
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
}
);


export const brandsModel = model<IBrands>('brands', newsSchema);