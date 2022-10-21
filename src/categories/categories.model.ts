import { model, Schema } from "mongoose";

export interface ICategories {
    category_id: string | null | undefined;
    category_name: string;
    category_image: string;
    category_link: string;
    category_type: string;
    created_at?: Date;
    updated_at?: Date;
    created_by?: string;
    updated_by?: string;
}

const newsSchema = new Schema<ICategories>(
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
        category_link: {
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
}
);


export const categorysModel = model<ICategories>('categorys', newsSchema);