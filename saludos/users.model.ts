import { Schema, model, Document } from 'mongoose';

export interface IAdminUser extends Document {
    _id?: string;
    name: string;
    last_name: string;
    email: string;
    password: string;
    status: boolean;
    rol: string;
    birth_date: string;
    created_at: Date;
    updated_at: Date;
}

export interface ICreateAdminUserRequest {
    name: string;
    email: string;
    password: string;
    rol: string;
    birth_date: string;
}

const userSchema = new Schema<IAdminUser>({
    name: {
        type: String,
        required: [true, 'Name is required.']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required.'],
        validate: {
            validator: async function (email: string) {
                return await this.model('Admin_User').findOne({ email }) === null;
            },
            message: 'Email already exists.'
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required.']
    },
    rol: {
        type: String,
        required: [true, 'Rol is required.'],
        enum: ['admin', 'user']
    },
    birth_date: {
        type: String,
        required: [true, 'Birth date is required.']
    },
    status: {
        required: false,
        type: Boolean,
        default: true
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

export default model<IAdminUser>('Admin_User', userSchema);