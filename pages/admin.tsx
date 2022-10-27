import Login from 'components/Login';
import Navbar from 'components/Navbar';
import Head from 'next/head';
import React from 'react';

export default function Admin() {
    return <>
        <Head>
            <title> iFind - Admin </title>
        </Head>

        <Navbar />
        <Login />
    </>;
}
