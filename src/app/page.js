'use client';

// core
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { useSession } from 'next-auth/react';

// component
import Navbar from '@/components/organism/Navbar';
import Hero from '@/components/organism/Hero';
import CheckPermission from '@/components/organism/CheckPermission';
// import { useSelector, useDispatch } from 'react-redux';
// import { getListening, speechRecognitionSlice } from '@/redux/speech-recognition';

import { synth, speech } from '@/utils/textToSpeech';
import recognition from '@/utils/speechRecognition';
import { useEffect } from 'react';

const Beranda = () => {
    const router = useRouter();
    const { data } = useSession();
    const user = data?.user.name;

    useEffect(() => {
        try {
            recognition.start();
        } catch (error) {
            recognition.stop();
        }
    }, []);

    useEffect(() => {
        if (user) {
            synth.speak(speech(`Selamat datang di Voice See, ${user}.`));
        }
    }, [user]);

    useEffect(() => {
        recognition.onresult = (event) => {
            const command = event.results[0][0].transcript.toLowerCase();
            const cleanCommand = command?.replace('.', '');

            if (cleanCommand.includes('pergi')) {
                if (cleanCommand.includes('kelas')) {
                    recognition.stop();
                    let utterance = speech('Anda akan menuju halaman Daftar Kelas');
                    utterance.onend = () => {
                        recognition.stop();
                        router.push('/kelas');
                    };
                    synth.speak(utterance);
                } else if (cleanCommand.includes('rapor')) {
                    recognition.stop();
                    let utterance = speech('Anda akan menuju halaman Rapor');
                    utterance.onend = () => {
                        recognition.stop();
                        router.push('/rapor');
                    };
                    synth.speak(utterance);
                } else if (cleanCommand.includes('tes')) {
                    recognition.stop();
                    let utterance = speech('Anda akan menuju halaman test');
                    utterance.onend = () => {
                        recognition.stop();
                        router.push('/test');
                    };
                    synth.speak(utterance);
                }
            } else if (
                cleanCommand.includes('saya sekarang dimana') ||
                cleanCommand.includes('saya sekarang di mana') ||
                cleanCommand.includes('saya di mana') ||
                cleanCommand.includes('saya dimana')
            ) {
                synth.speak(speech('Kita sedang di halaman utama'));
            }

            console.log(cleanCommand)
        };

        recognition.onend = () => {
            recognition.start();
        };
    }, [router]);

    return (
        <>
            <Navbar />
            <Hero />
            {/* <CheckPermission /> */}
        </>
    );
};

export default Beranda;
