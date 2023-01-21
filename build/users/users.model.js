"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, 'Name is required.']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Email is required.'],
        validate: {
            validator: async function (email) {
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
exports.default = (0, mongoose_1.model)('Admin_User', userSchema);
