import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        }),
    ],
    // 1 day session
    // session: {
    //     maxAge: 1000 * 60 * 60 * 24,
    // },
    // 5 minute session
    session: {
        maxAge: 60 * 5,
    },
    callbacks: {
        session({ session, token, user }) {
            return session;
        },
    },
}); 