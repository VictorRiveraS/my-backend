"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const env_1 = require("./env");
class Database {
    async connect() {
        try {
            await mongoose_1.default.connect(env_1.MONGO_URI);
            console.log('Database connected');
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = new Database();
