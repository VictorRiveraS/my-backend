import mongoose from 'mongoose'

const saludoSchema = new mongoose.Schema({
    saludo: String,
    id: Number,
});

export const Saludo = mongoose.model('saludos', saludoSchema)