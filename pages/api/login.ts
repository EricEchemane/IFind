import normalize, { RequestError } from "http/response_normalizer";
import { NextApiRequest } from "next";

async function handler(req: NextApiRequest) {
    const { username, password } = req.body;

    if (username === "admin" && password === "admin123") {
        return 'Access granted';
    }
    else throw new RequestError(401, "Access denied");
}

export default normalize(handler);