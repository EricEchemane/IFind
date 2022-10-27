/* eslint-disable @next/next/no-img-element */
import useUser from 'hooks/useUser';
import React, { FormEvent, useState } from 'react';
import { signIn, useSession } from "next-auth/react";
import Http from 'http/adapter';
import Router from 'next/router';

export default function SignIn() {
    const [password, setPassword] = useState("");
    const { error } = useUser({ whenFoundRedirectTo: "/" });
    const { data: session } = useSession();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await Http.post("/api/user/sign-in", { password }, {
            onFail: console.log,
            onSuccess: () => Router.replace("/")
        });
    };

    if (error?.code === 404) return (
        <div>
            <h6>
                {session?.user?.name}
            </h6>
            <h6>
                {session?.user?.email}
            </h6>
            <img alt={session?.user?.name || ""} src={session?.user?.image || ""} />
            <form onSubmit={handleSubmit}>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password} />
                <button type="submit"> Sign in </button>
            </form>
        </div>
    );
    if (error?.code === 401) return (
        <button onClick={() => signIn("google")}>
            Sign in with google
        </button>
    );

    return <></>;
}