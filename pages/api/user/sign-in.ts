
import bcrypt from "bcryptjs";
import connectToDatabase from "db/connect";
import { NextApiRequest } from "next";
import { JWT } from "next-auth/jwt";
import normalize, { RequestError } from "http/response_normalizer";

async function handler(req: NextApiRequest, token: JWT) {
    if (req.method !== "POST") throw new RequestError(405, "Method not allowed");

    const { password } = req.body;

    const db = await connectToDatabase();
    if (!db) {
        throw new RequestError(500, 'Database connection failed');
    }

    const { User } = db.models;

    const user = new User({
        email: token.email,
        name: token.name,
        picture: token.picture,
        password: bcrypt.hashSync(password, 10)
    });

    await user.save();

    return user;
}

export default normalize(handler);