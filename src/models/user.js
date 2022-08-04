import mongoose from 'mongoose'

const USER_SCHEMA = new mongoose.Schema({
    name: String,
    lastNames: String,
    password: String
});

export const Saludo = mongoose.model('users', USER_SCHEMA)