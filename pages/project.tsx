import Head from 'next/head';
import React, { FormEvent, useState } from 'react';
import * as tf from "@tensorflow/tfjs";
import { Button, Center, Group, NumberInput, Select, Stack, TextInput, Title } from '@mantine/core';
import Navbar from 'components/Navbar';
import { showNotification } from '@mantine/notifications';
import { ImageDropzone } from 'components/ImageDropzone';

interface Prediction {
    eyes: { color: string, accuracy: string; };
    nose: { isPointed: boolean, accuracy: string; };
    skin: { color: boolean, accuracy: string; };
}

export default function Project() {
    const [fullName, setFullName] = useState('');
    const [gender, setGender] = useState<'' | 'male' | 'female' | 'prefer not to say'>('');
    const [age, setage] = useState<number | undefined>();

    const [imgSrc, setImgSrc] = useState<string>();
    const [file, setFile] = useState<File>();
    const [classifying, setClassifying] = useState(false);

    const [prediction, setPrediction] = useState<Prediction | undefined>();

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (gender === '') {
            showNotification({
                message: 'Please select your gender',
                color: 'red',
            });
            return;
        }
    };

    async function handleDrop(files: File[]) {
        const file = files[0];
        if (!file) return;
        setClassifying(true);
        setFile(file);
        setImgSrc(URL.createObjectURL(file));

        const img = document.createElement('img');
        img.width = 400;
        img.height = 540;
        img.src = URL.createObjectURL(file);

        predict(img);
    }

    const predict = async (img: HTMLImageElement) => {
        setClassifying(true);
        const eyesModel = await tf.loadLayersModel('/models/eyes/model.json');
        const noseModel = await tf.loadLayersModel('/models/nose/model.json');
        const skinModel = await tf.loadLayersModel('/models/skin/model.json');
        // const imageTensor = tf.browser.fromPixels(img)
        //     .expandDims(0)
        //     .expandDims(-1)
        //     .div(255.0)
        //     .reshape([-1, 256, 256, 3]);

        // const pred: any = model.predict(imageTensor);
        // const results = await pred.data();
        // const confidence = Math.max(...results);
        // const index = results.findIndex((r: any) => r === confidence);
        // const type = labels[index];

        // console.log(type, confidence);

        // if (type === "not" || type === "alike" || confidence < .75) {
        //     setClassifying(false);
        //     return;
        // }
        setClassifying(false);
    };

    return <>
        <Head>
            <title> iFind - Classification </title>
        </Head>

        <Navbar />

        <Center mt={24}>
            <Stack sx={{ width: 'min(1000px, 90vw)' }} pb='4rem'>

                <Title order={2} mb={16}> Classification </Title>

                <form onSubmit={onSubmit}>
                    <div className='classification'>
                        <Stack sx={{ width: '100%' }}>
                            <Stack>
                                <TextInput
                                    size='lg'
                                    required
                                    value={fullName}
                                    onChange={(e) => setFullName(e.currentTarget.value)}
                                    placeholder='Your full name'
                                    label="Full Name" />
                                <NumberInput
                                    size='lg'
                                    required
                                    value={age}
                                    onChange={setage}
                                    placeholder="Your age"
                                    label="Your age"
                                    withAsterisk
                                />
                                <Select
                                    value={gender}
                                    onChange={(v: any) => setGender(v)}
                                    size='lg'
                                    required
                                    withAsterisk
                                    label="Gender"
                                    placeholder="your gender"
                                    data={[
                                        { value: 'male', label: 'male' },
                                        { value: 'female', label: 'female' },
                                        { value: 'prefer not to say', label: 'prefer not to say' },
                                    ]}
                                />
                                {/* <Button type='submit'>
                                    Submit
                                </Button> */}
                            </Stack>
                        </Stack>

                        <Stack sx={{ width: '100%', marginTop: '1.7rem' }}>
                            <ImageDropzone
                                onDrop={handleDrop}
                                imgsrc={imgSrc}
                                loading={classifying} />
                            <Button>
                                Classify
                            </Button>
                        </Stack>
                    </div>
                </form>
            </Stack>
        </Center>
    </>;
}
