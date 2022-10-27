import { Stack, Title, Text, Group } from '@mantine/core';
import React from 'react';

export default function ContactUs() {
    return <>
        <Stack style={{ width: 'min(1000px, 90vw' }} m='5rem auto'>
            <Title
                order={2}
                style={{ borderLeft: '5px solid orange' }}
                pl='1rem'>
                Contact Us
            </Title>
            <Stack mt={12}>
                <Contact
                    url='https://plmun.info'
                    iconClassName='bx bxs-edit-location'>
                    Pamantasan ng Lungsod ng Muntinlupa
                </Contact>
                <Contact iconClassName='bx bxs-phone'>
                    0938 042 8072
                </Contact>
                <Contact iconClassName='bx bxs-envelope'>
                    zazifind@gmail.com
                </Contact>
            </Stack>
        </Stack>
    </>;
}

const Contact = (props: { iconClassName: string; children: string; url?: string; }) => {
    return <a href={props.url} target='_blank' rel='noreferrer'>
        <Group spacing={8}>
            <i style={{ fontSize: '1.5rem' }} className={props.iconClassName}></i>
            <Text> {props.children} </Text>
        </Group>
    </a>;
};