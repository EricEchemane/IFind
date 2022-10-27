import { Stack, Title, Text, Group } from '@mantine/core';
import React from 'react';

export default function AboutUs() {
    return <>
        <Stack style={{ width: 'min(1000px, 90vw' }} m='5rem auto'>
            <Title
                order={2}
                style={{ borderLeft: '5px solid orange' }}
                pl='1rem'>
                About Us
            </Title>
            <Text>
                Students from Pamantasan ng Lungsod ng Muntinupa taking Bachelor of Science in Computer Science
            </Text>
            <Group>
                <ContactIcon
                    iconClassName='bx bxl-facebook-square'
                    url='https://facebook.com/zazifind' />
                <ContactIcon
                    iconClassName='bx bxl-twitter'
                    url='https://twitter.com/zazifind' />
            </Group>
        </Stack>
    </>;
}

const ContactIcon = (props: { iconClassName: string; url: string; }) => {
    return <a href={props.url} target={'_blank'} rel='noreferrer'>
        <i style={{ fontSize: '1.5rem' }} className={props.iconClassName}></i>
    </a>;
};