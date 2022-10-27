import React from 'react';
import { Group, Paper, Title } from '@mantine/core';
import Link from 'next/link';

export default function Navbar() {
    return <Paper shadow={'lg'} p='1rem'>
        <Group position='apart'>
            <Title> iFind </Title>
            <Group spacing={24}>
                <Link href={'/'}> Home </Link>
                <Link href={'/project'}> Project </Link>
                <Link href={'/developers'}> Developers </Link>
                <a href={'/docs/research.pdf'} target='_blank' rel='noreferrer'> Research </a>
            </Group>
        </Group>
    </Paper>;
}
