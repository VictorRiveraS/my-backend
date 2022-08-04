import { Schema, model, Document } from 'mongoose';

export interface SALUDO_I {
    saludo: String,
    lastNames: String,
    internalId: number
}

const SALUDOS_SCHEMA = new Schema<SALUDO_I>({
    saludo: {
        type: String,
        required: [true, 'Saludo is required.']
    },
    lastNames: {
        type: String,
        required: [true, 'Last names is required.']
    }
    ,
    internalId: {
        type: Number,
        required: [true, 'Last names is required.']
    }
});

export default model<SALUDO_I>('Saludo', SALUDOS_SCHEMA);
