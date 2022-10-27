import connectToDatabase from "db/connect";
import normalize, { RequestError } from "http/response_normalizer";
import { NextApiRequest } from "next";

async function handler(req: NextApiRequest) {
    const db = await connectToDatabase();
    if (!db) throw new RequestError(500, "Database connection failed");

    const { Person } = db.models;
    const records = await Person.find();
    return records;
}

export default normalize(handler);