import type { NextApiRequest, NextApiResponse } from 'next';
const nodemailer = require("nodemailer");

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { message, email } = req.body;
    const APP_PASSWORD = process.env.GMAIL_PASSWORD;

    if (!message || !email) return res.status(400).end();

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'zazifind@gmail.com',
            pass: APP_PASSWORD
        }
    });

    const mailOptions = {
        from: email,
        to: email,
        subject: `iFind Updates`,
        text: 'Thank you for your message. We will send you updates soon.',
    };

    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ success: true });
    } catch (error) {
        return res.status(500).json({ success: false });
    }
}