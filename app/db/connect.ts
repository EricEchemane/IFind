import mongoose from 'mongoose';
import userSchema from './schemas/user';

let database: typeof mongoose | null = null;

export default async function connectToDatabase(): Promise<typeof mongoose | null> {
    try {
        if (database) {
            return database;
        }
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI not set');
        }
        if (!process.env.DB_NAME) {
            throw new Error('DB_NAME not set');
        }

        if (!mongoose.models.User) mongoose.model('User', userSchema);
        const connection = await mongoose.connect(
            process.env.MONGODB_URI,
            { dbName: process.env.DB_NAME });

        database = connection;

        return database;

    } catch (error) {
        console.error('Can not connect to database', error);
        return null;
    }
}