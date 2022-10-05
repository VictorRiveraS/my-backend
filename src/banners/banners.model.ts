import { model, Schema } from "mongoose";

export interface IBanners {
    banner_id: string | null | undefined;
    name: string;
    image: string;
    link_banner: string;
    created_at?: Date;
    updated_at?: Date;
    created_by?: string;
    updated_by?: string;
}

const newsSchema = new Schema<IBanners>({
    banner_id: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: [true, 'Banners name is required.']
    },
    link_banner: {
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


export const BannersModel = model<IBanners>('banners', newsSchema);