import { Button, Center, Group, Modal, Stack, Textarea, TextInput, Title } from '@mantine/core';
import Navbar from 'components/Navbar';
import Http from 'http/adapter';
import Head from 'next/head';
import React, { FormEvent, useState } from 'react';
import { showNotification } from '@mantine/notifications';
import AboutUs from 'components/AboutUs';

export default function HomePage() {

  const [getUpdatesModalIsOpen, setGetUpdatesModalIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    Http.post('/api/send-email', { email, message }, {
      loadingToggler: setLoading,
      onFail: alert,
      onSuccess: () => {
        setGetUpdatesModalIsOpen(false);
        showNotification({
          title: 'Sent successfully',
          message: 'Thank you for subscribing to our updates. We will send you an email when we have something new to share.',
          color: 'green',
        });
        setEmail('');
        setMessage('');
      }
    });
  };

  return <>
    <Head>
      <title> iFind </title>
    </Head>

    <Navbar />

    <Stack style={{ width: 'min(1000px, 90vw', margin: 'auto' }}>
      <Center>
        <Stack
          spacing={0}
          align='center'
          sx={{ textAlign: 'center', paddingTop: '6rem' }}>
          <Title> FACIAL POINTS PREDICTION </Title>
          <Title color={'orange'}> OF MISSING PERSON </Title>
          <Title> THROUGH IMAGE PROCESSING </Title>
          <Group sx={{ marginTop: '3rem' }} spacing='xl'>
            <a href='/docs/research.pdf' rel='noreferrer' target={'_blank'}>
              <Button size='lg'> Read more </Button>
            </a>
            <Button onClick={() => setGetUpdatesModalIsOpen(true)} size='lg' variant='outline'> Get Updates </Button>
          </Group>
        </Stack>
      </Center>
    </Stack>

    <AboutUs />

    <Modal
      closeOnClickOutside={false}
      opened={getUpdatesModalIsOpen}
      onClose={() => setGetUpdatesModalIsOpen(false)}
      title="Get Udpates"
    >
      <form onSubmit={onSubmit}>
        <TextInput
          type={'email'}
          required
          mb={'xl'}
          width={'100%'}
          value={email}
          onChange={(e) => setEmail(e.currentTarget.value)}
          label="Email"
          placeholder='Your email here' />
        <Textarea
          mb={'xl'}
          required
          placeholder="Your message here"
          label="Message"
          withAsterisk
          value={message}
          onChange={(e) => setMessage(e.currentTarget.value)}
        />
        <Button loading={loading} type='submit' sx={{ float: 'right' }}> Submit </Button>
      </form>
    </Modal>
  </>;
}