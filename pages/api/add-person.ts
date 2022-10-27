import connectToDatabase from "db/connect";
import { PersonType } from "db/person.schema";
import normalize, { RequestError } from "http/response_normalizer";
import { NextApiRequest } from "next";

async function handler(req: NextApiRequest) {
    if (req.method !== "POST") throw new RequestError(405, "Method Not Allowed");

    const {
        fullName,
        age,
        gender,
        eyes, nose, skin
    }: PersonType = req.body;

    // validate the body
    if (!fullName || !age || !gender || !eyes || !nose || !skin) {
        throw new RequestError(400, "Missing required fields");
    }

    const db = await connectToDatabase();
    if (!db) throw new RequestError(500, "Internal Server Error");
    const { Person } = db.models;

    const person = new Person(req.body);
    await person.save();

    return person;
}

export default normalize(handler);