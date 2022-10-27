import { Button, Center, Stack, Title } from '@mantine/core';
import Navbar from 'components/Navbar';
import Head from 'next/head';
import Link from 'next/link';

import React from 'react';

export default function HomePage() {

  return <>
    <Head>
      <title> iFind </title>
    </Head>

    <Navbar />

    <Stack style={{ width: 'min(1000px, 90vw', margin: '5rem auto' }}>
      <Center>
        <Stack spacing={0} align='center'>
          <Title> FACIAL POINTS PREDICTION </Title>
          <Title color={'#df3f00'}> OF MISSING PERSON </Title>
          <Title> THROUGH IMAGE PROCESSING </Title>
          <a href='/docs/research.pdf' rel='noreferrer' target={'_blank'}>
            <Button size='lg' sx={{ marginTop: '3rem' }}> Read more </Button>
          </a>
        </Stack>
      </Center>
    </Stack>
  </>;
}