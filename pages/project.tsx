import Head from 'next/head';
import React, { FormEvent, useEffect, useState } from 'react';
import * as tf from "@tensorflow/tfjs";
import { Button, Center, NumberInput, Select, Stack, TextInput, Title, Text, Group, Modal } from '@mantine/core';
import Navbar from 'components/Navbar';
import { showNotification } from '@mantine/notifications';
import { ImageDropzone } from 'components/ImageDropzone';
import { eyesLabels, noseLabels, skinLabels } from 'app/labels';
import Http from 'http/adapter';
import Login from 'components/Login';
import Admin from 'components/admin';

type eyesPrediction = { color: string, accuracy: string; };
type nosePrediction = { isPointed: boolean, accuracy: string; };
type skinPrediction = { color: string, accuracy: string; };

type PredictionStatus =
    | "Detecting your skin color..."
    | "Detecting your nose..."
    | "Detecting your eye color..."
    | "done"
    | "none";

export default function Project() {
    const [fullName, setFullName] = useState('');
    const [gender, setGender] = useState<'' | 'male' | 'female' | 'prefer not to say'>('');
    const [age, setage] = useState<number | undefined>();

    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [adminModal, setAdminModal] = useState(false);

    const [imgSrc, setImgSrc] = useState<string>();
    const [file, setFile] = useState<File>();
    const [classifying, setClassifying] = useState(false);

    const [predictionStatus, setPredictionStatus] = useState<PredictionStatus>("none");
    const [eyesOutput, setEyesOutput] = useState<eyesPrediction>();
    const [skinOutput, setSkinOutput] = useState<skinPrediction>();
    const [noseOutput, setNoseOutput] = useState<nosePrediction>();

    useEffect(() => {
        const loggedIn = sessionStorage.getItem('iFind');
        if (loggedIn === 'loggedIn') {
            setIsLoggedIn(true);
        }
    }, []);

    const onSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (gender === '') {
            showNotification({
                message: 'Please select your gender',
                color: 'red',
            });
            return;
        }

        const payload = {
            fullName,
            gender,
            age,
            photo: imgSrc,
            eyes: eyesOutput,
            nose: noseOutput,
            skin: skinOutput,
        };

        Http.post('/api/add-person', payload, {
            loadingToggler: setLoading,
            onFail: alert,
            onSuccess: () => {
                showNotification({
                    message: 'Missing person added successfully',
                    color: 'green',
                });
                // reset all
                setFullName('');
                setGender('');
                setage(undefined);
                setImgSrc(undefined);
                setFile(undefined);
                setEyesOutput(undefined);
                setNoseOutput(undefined);
                setSkinOutput(undefined);
                setPredictionStatus("none");
            }
        });
    };

    async function handleDrop(files: File[]) {
        const file = files[0];
        if (!file) return;
        setClassifying(true);
        setFile(file);

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setImgSrc(reader.result as string);
        };

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

        const tensor = tf.browser.fromPixels(img)
            .expandDims(0)
            .expandDims(-1)
            .div(255.0)
            .reshape([-1, 400, 540, 3]);

        // classify skin
        setPredictionStatus("Detecting your skin color...");
        const skinPred: any = skinModel.predict(tensor);
        const skinResults = await skinPred.data();
        const skinConfidence = Math.max(...skinResults);
        const skinIndex = skinResults.findIndex((r: any) => r === skinConfidence);
        const skinColor = skinLabels[skinIndex];
        const skin = { color: skinColor, accuracy: `${(skinConfidence * 100).toFixed(2)}%` };
        setSkinOutput(skin);
        // classify nose
        setPredictionStatus("Detecting your nose...");
        const nosePred: any = noseModel.predict(tensor);
        const noseResults = await nosePred.data();
        const noseConfidence = Math.max(...noseResults);
        const noseIndex = noseResults.findIndex((r: any) => r === noseConfidence);
        const noseLabel = noseLabels[noseIndex];
        const nose = { isPointed: noseLabel === 'pointed', accuracy: `${(noseConfidence * 100).toFixed(2)}%` };
        setNoseOutput(nose);
        // classify eyes
        setPredictionStatus("Detecting your eye color...");
        const eyesPred: any = eyesModel.predict(tensor);
        const eyesResults = await eyesPred.data();
        const eyesConfidence = Math.max(...eyesResults);
        const eyeIndex = eyesResults.findIndex((r: any) => r === eyesConfidence);
        const eyeColor = eyesLabels[eyeIndex];
        const eyes = { color: eyeColor, accuracy: `${(eyesConfidence * 100).toFixed(2)}%` };
        setEyesOutput(eyes);

        setPredictionStatus("done");
        setClassifying(false);
    };

    if (!isLoggedIn) return <Login onLoggedIn={() => setIsLoggedIn(true)} />;

    return <>
        <Head>
            <title> iFind - Classification </title>
        </Head>

        <Navbar />

        <Center mt={24}>
            <Stack sx={{ width: 'min(1000px, 90vw)' }} pb='4rem'>

                <Group mb={16} mt={24} position='apart'>
                    <Title order={2}> Classification </Title>
                    <Button onClick={() => setAdminModal(true)} variant='gradient'> view records </Button>
                </Group>

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
                                {predictionStatus === "done" && <>
                                    <div>
                                        <Title order={5}> Skin </Title>
                                        <Text> {skinOutput?.color} | Accuracy: {skinOutput?.accuracy}</Text>
                                    </div>
                                    <div>
                                        <Title order={5}> Nose </Title>
                                        <Text> {noseOutput?.isPointed ? 'pointed' : 'flat'} | Accuracy: {noseOutput?.accuracy}</Text>
                                    </div>
                                    <div>
                                        <Title order={5}> Eyes </Title>
                                        <Text> {eyesOutput?.color} | Accuracy: {eyesOutput?.accuracy}</Text>
                                    </div>

                                    <Button loading={loading} mt='lg' size='lg' type='submit'>
                                        {loading ? 'saving' : 'Save'}
                                    </Button>
                                </>}
                            </Stack>
                        </Stack>

                        <Stack sx={{ width: '100%', marginTop: '1.7rem' }}>
                            <ImageDropzone
                                onDrop={handleDrop}
                                imgsrc={imgSrc}
                                loading={classifying} />
                        </Stack>
                    </div>
                </form>
            </Stack>
        </Center>

        <Modal
            opened={adminModal}
            onClose={() => setAdminModal(false)}
            title={<Title order={2}> Records </Title>}
            fullScreen>
            <Admin />
        </Modal>

        <Modal
            zIndex={10}
            withCloseButton={false}
            // opened={predictionStatus === "none"}
            opened={predictionStatus !== "none" && predictionStatus !== "done"}
            onClose={() => { }}
            title={"Classification"}>

            <Title order={3} italic mb={'md'}> {predictionStatus} </Title>

            {skinOutput && <>
                <Title order={4}> Skin </Title>
                <Text mb={'md'}> Color: {skinOutput.color} | Accuracy: {skinOutput.accuracy}</Text>
            </>}

            {noseOutput && <>
                <Title order={4}> Nose </Title>
                <Text mb={'md'}> Shape: {noseOutput.isPointed ? 'pointed' : 'flat'} | Accuracy: {noseOutput.accuracy}</Text>
            </>}

            {eyesOutput && <>
                <Title order={4}> Eyes </Title>
                <Text mb={'md'}> Color: {eyesOutput.color} | Accuracy: {eyesOutput.accuracy}</Text>
            </>}

        </Modal>
    </>;
}
