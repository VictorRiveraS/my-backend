import { model, Schema } from "mongoose";

export interface IBanners {
    banner_id: string | null | undefined;
    banner_name: string;
    banner_image: string;
    banner_link: string;
    banner_type: string;
    created_at?: Date;
    updated_at?: Date;
    created_by?: string;
    updated_by?: string;
}

const newsSchema = new Schema<IBanners>(
    {
        banner_id: {
            type: String,
            required: false
        },
        banner_name: {
            type: String,
            required: [true, 'Banners name is required.']
        },
        banner_image: {
            type: String,
            required: false
        },
        banner_link: {
            type: String,
            required: false
        },
        banner_type: {
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


export const BannersModel = model<IBanners>('banners', newsSchema);