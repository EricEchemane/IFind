import { Button, Stack, TextInput, Title } from '@mantine/core';
import Http from 'http/adapter';
import React, { FormEvent, useState } from 'react';

export default function Login(props: { onLoggedIn: () => void; }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        Http.post('/api/login', { username, password }, {
            loadingToggler: setLoading,
            onFail: alert,
            onSuccess() {
                sessionStorage.setItem('iFind', 'loggedIn');
                props.onLoggedIn();
            },
        });
    };

    return <form onSubmit={onSubmit}>
        <Stack
            spacing={20}
            m={'3rem auto'}
            style={{ width: 'min(90vw,600px)' }}>
            <Title order={2} align='center'>
                Admin login
            </Title>
            <TextInput
                size='lg'
                value={username}
                onChange={(e) => setUsername(e.currentTarget.value)}
                placeholder={'Username'}
                required
                label={'Username'}
            />
            <TextInput
                size='lg'
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                placeholder={'Password'}
                required
                type={'password'}
                label={'Password'}
            />
            <Button size='lg' type='submit' mt={'lg'} loading={loading}>
                Login
            </Button>
        </Stack>
    </form>;
}
