

import mongoose from 'mongoose';
import { MONGO_URI } from './env';

class Database {
    public async connect(): Promise<void> {
        try {
            await mongoose.connect(MONGO_URI);
            console.log('Database connected');
        } catch (error) {
            console.log(error);
        }

    }
}

export default new Database();