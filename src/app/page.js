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
    const [speaking, setSpeaking] = useState(false);

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

            if (command.includes('pergi kelas')) {
                recognition.stop();
                let utterance = speech('Anda akan pergi ke Daftar Kelas');
                setSpeaking(true);
                utterance.onend = () => {
                    recognition.stop();
                    router.push('/kelas');
                };
                synth.speak(utterance);
            } else if (command.includes('pergi rapor')) {
                recognition.stop();
                let utterance = speech('Anda akan pergi ke Rapor');
                setSpeaking(true);
                utterance.onend = () => {
                    recognition.stop();
                    router.push('/rapor');
                };
                synth.speak(utterance);
            } else if (command.includes('pergi tes')) {
                recognition.stop();
                let utterance = speech('Anda akan pergi ke test');
                setSpeaking(true);
                utterance.onend = () => {
                    recognition.stop();
                    router.push('/test');
                };
                synth.speak(utterance);
            } else if (
                command.includes('saya sekarang dimana') ||
                command.includes('saya sekarang di mana') ||
                command.includes('saya di mana') ||
                command.includes('saya dimana')
            ) {
                synth.cancel();
                synth.speak(speech('Kita sedang di halaman utama'));
            }

            console.log(event.results[0][0].transcript.toLowerCase());
        };

        recognition.onend = () => {
            if (!speaking) {
                recognition.start();
            }
        };
    }, [router, speaking]);

    return (
        <>
            <Navbar />
            <Hero />
            <CheckPermission />
        </>
    );
};

export default Beranda;
