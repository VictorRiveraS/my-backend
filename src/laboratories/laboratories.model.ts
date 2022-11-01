import { model, Schema } from "mongoose";

export interface ILaboratory {
    laboratory_id: string | null | undefined;
    laboratory_name: string;
    laboratory_image: string;
    created_at?: Date;
    updated_at?: Date;
    created_by?: string;
    updated_by?: string;
}

const newsSchema = new Schema<ILaboratory>(
    {
        laboratory_id: {
            type: String,
            required: false
        },
        laboratory_name: {
            type: String,
            required: [true, 'Laboratory name is required.']
        },
        laboratory_image: {
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


export const laboratoriesModel = model<ILaboratory>('laboratories', newsSchema);