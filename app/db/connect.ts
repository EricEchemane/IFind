import mongoose from 'mongoose';
import personSchema from './person.schema';

let database: typeof mongoose | null = null;

export default async function connectToDatabase(): Promise<typeof mongoose | null> {
    try {
        if (database) {
            return database;
        }
        if (!process.env.MONGODB_URI) {
            throw new Error('MONGODB_URI not set');
        }

        if (!mongoose.models.Person) mongoose.model('Person', personSchema);
        const connection = await mongoose.connect(
            process.env.MONGODB_URI,
            { dbName: 'ifind' });

        database = connection;

        return database;

    } catch (error) {
        console.error('Can not connect to database', error);
        return null;
    }
}