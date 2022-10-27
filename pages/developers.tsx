import { Group, Paper, Title, Text } from '@mantine/core';
import AboutUs from 'components/AboutUs';
import ContactUs from 'components/ContactUs';
import Navbar from 'components/Navbar';
import Head from 'next/head';
import Image from 'next/image';
import React from 'react';

export default function Developers() {
    return <>
        <Head>
            <title> iFind Developers </title>
        </Head>
        <Navbar />

        <Title order={2} align='center' my="2rem"> The Developers </Title>

        <Group position='center' align={'flex-start'} pb='3rem' spacing={'xl'}>
            <Paper
                radius={'md'}
                shadow={'xl'} style={{ width: 'min(300px, 100%)' }}
                withBorder p={'1rem'}>
                <div style={{ position: 'relative', height: '300px' }}>
                    <Image
                        style={{ borderRadius: '.2rem' }}
                        src={'/developers/brixter.png'}
                        alt='Brixter Zabala'
                        objectFit='cover'
                        objectPosition={'center'}
                        layout='fill' />
                </div>
                <Title my={'sm'} order={2}> Brixter Zabala </Title>
                <Text color={'dimmed'}>
                    {`He is a Student form Pamanatasan ng Lungsod ng Muntinlupa part of BSCS 4A, He's Currently 22 Years old (2022), He was born in November 23 199`}
                </Text>
            </Paper>

            <Paper
                radius={'md'}
                shadow={'xl'} style={{ width: 'min(300px, 100%)' }}
                withBorder p={'1rem'}>
                <div style={{ position: 'relative', height: '300px' }}>
                    <Image
                        style={{ borderRadius: '.2rem' }}
                        src={'/developers/aguilar.jpg'}
                        alt='Ace Mark Aguilar'
                        objectFit='cover'
                        objectPosition={'center'}
                        layout='fill' />
                </div>
                <Title my={'sm'} order={2}> Ace Mark Aguilar </Title>
                <Text color={'dimmed'}>
                    {`He is a Student form Pamanatasan ng Lungsod ng Muntinlupa part of BSCS 4A, He's Currently 21 Years old (2022), He was born in January, 10 2001`}
                </Text>
            </Paper>

            <Paper
                radius={'md'}
                shadow={'xl'} style={{ width: 'min(300px, 100%)' }}
                withBorder p={'1rem'}>
                <div style={{ position: 'relative', height: '300px' }}>
                    <Image
                        style={{ borderRadius: '.2rem' }}
                        src={'/developers/zagala.jpg'}
                        alt='Aaron Ace Zagala'
                        objectFit='cover'
                        objectPosition={'center'}
                        layout='fill' />
                </div>
                <Title my={'sm'} order={2}> Aaron Ace Zagala </Title>
                <Text color={'dimmed'}>
                    {`He is a Student form Pamanatasan ng Lungsod ng Muntinlupa part of BSCS 4A, He's Currently 21 Years old (2022), He was born in April 07,2001`}
                </Text>
            </Paper>
        </Group>

        <AboutUs />
        <ContactUs />
    </>;
}
