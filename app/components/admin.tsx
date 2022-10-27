/* eslint-disable @next/next/no-img-element */
import { Button, Stack, Table, Title, Text, Modal } from '@mantine/core';
import { PersonType } from 'db/person.schema';
import useFetch from 'hooks/useFetch';
import Http from 'http/adapter';
import React, { useState } from 'react';

type Person = PersonType & { _id: string; };

export default function Admin() {
    const { data, error, get } = useFetch('/api/records');
    const records: Person[] = data?.data;

    const [selectedPerson, setSelectedPerson] = useState<PersonType | undefined>();
    const [loading, setLoading] = useState(false);

    const markAsFound = async () => {
        setLoading(true);
        Http.post("/api/found", { _id: (selectedPerson as any)._id, }, {
            loadingToggler: setLoading,
            onFail: alert,
            onSuccess() {
                setSelectedPerson(p => {
                    if (p) p.status = "found";
                    return p;
                });
                get();
            }
        });
        setLoading(false);
    };

    if (!records && !error) return <Title order={3}> Loading... </Title>;
    if (error) return <Title order={3}> Error getting records </Title>;

    return <>
        <Stack px={'lg'}>
            <Table verticalSpacing="md" highlightOnHover>
                <thead>
                    <tr>
                        <th> Date Reported </th>
                        <th> Full Name </th>
                        <th> Status </th>
                    </tr>
                </thead>
                <tbody>
                    {records.map((record) => (
                        <tr
                            onClick={() => setSelectedPerson(record)}
                            style={{ cursor: 'pointer' }}
                            key={record._id}>
                            <td> {new Date(record.createdAt).toLocaleDateString()} {new Date(record.createdAt).toLocaleTimeString()} </td>
                            <td> {record.fullName} </td>
                            <td>
                                <Text transform='capitalize' color={record.status === 'missing' ? 'orange' : 'green'}>
                                    {record.status}
                                </Text>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Stack>

        <Modal
            size={'lg'}
            opened={!!selectedPerson}
            title={
                <Title
                    transform='capitalize'
                    order={4}
                    color={selectedPerson?.status === 'missing' ? 'orange' : 'green'}>
                    {selectedPerson?.status}
                </Title>}
            onClose={() => setSelectedPerson(undefined)}>

            <div className='person-modal'>
                <div className='person-photo'>
                    <img src={selectedPerson?.photo} alt="person" />
                </div>
                <div className='details'>
                    <Title> {selectedPerson?.fullName} </Title>
                    <Title mb='md' order={5}> {selectedPerson?.age} years old • {selectedPerson?.gender} </Title>

                    <Text> {selectedPerson?.skin.color} skin • accuracy: {selectedPerson?.skin.accuracy}</Text>
                    <Text> {selectedPerson?.nose.isPointed ? 'pointed' : 'flat'} nose • accuracy: {selectedPerson?.nose.accuracy}</Text>
                    <Text> {selectedPerson?.eyes.color} eyes • accuracy: {selectedPerson?.eyes.accuracy}</Text>

                    <div className='actions'>
                        <Button variant='outline'> Remove </Button>
                        {selectedPerson?.status === 'missing' &&
                            <Button
                                onClick={markAsFound}
                                color='green'
                                loading={loading}>
                                Mark as found
                            </Button>}
                    </div>
                </div>
            </div>
        </Modal>
    </>;
}
