import connectToDatabase from "db/connect";
import normalize, { RequestError } from "http/response_normalizer";
import { NextApiRequest } from "next";

async function handler(req: NextApiRequest) {
    const { _id } = req.body;

    const db = await connectToDatabase();
    if (!db) throw new RequestError(500, "Database connection failed");

    const { Person } = db.models;

    const person = await Person.deleteOne({ _id });

    if (person.deletedCount === 0) throw new RequestError(404, "Person not found");

    return person;
}

export default normalize(handler);