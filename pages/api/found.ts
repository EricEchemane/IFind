import connectToDatabase from "db/connect";
import normalize, { RequestError } from "http/response_normalizer";
import { NextApiRequest } from "next";

async function handler(req: NextApiRequest) {
    const { _id } = req.body;

    const db = await connectToDatabase();
    if (!db) throw new RequestError(500, "Database connection failed");

    const { Person } = db.models;

    const person = await Person.findById(_id);
    person.status = 'found';
    await person.save();

    return person;
}

export default normalize(handler);