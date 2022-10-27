/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Group, Paper, Title } from '@mantine/core';
import Link from 'next/link';

export default function Navbar() {
    return <Paper shadow={'lg'} p='1rem' style={{ position: 'sticky', top: 0, zIndex: 2 }}>
        <Group position='apart'>
            <Group spacing={8}>
                <img src="/logo.png" alt="logo" width={30} style={{ filter: 'invert(100%)' }} />
                <Title> iFind </Title>
            </Group>
            <Group spacing={24}>
                <Link href={'/'}> Home </Link>
                <Link href={'/project'}> Project </Link>
                <Link href={'/developers'}> Developers </Link>
                <a href={'/docs/research.pdf'} target='_blank' rel='noreferrer'> Research </a>
            </Group>
        </Group>
    </Paper>;
}
