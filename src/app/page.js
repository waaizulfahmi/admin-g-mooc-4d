'use client';

// core
import { useRouter } from 'next/navigation';

import { useSession } from 'next-auth/react';

// component
import Navbar from '@/components/organism/Navbar';
import Hero from '@/components/organism/Hero';
import CheckPermission from '@/components/organism/CheckPermission';

import { synth, speech } from '@/utils/textToSpeech';
import recognition from '@/utils/speechRecognition';
import { useEffect } from 'react';

const Beranda = () => {
    const router = useRouter();
    const { data } = useSession();
    const user = data?.user.name;

    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (user) {
                synth.speak(speech(`Selamat datang di Voice See, ${user}.`));
            }
        }
    }, [user]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            recognition.onresult = (event) => {
                const command = event.results[0][0].transcript.toLowerCase();

                if (command.includes('pergi kelas')) {
                    recognition.stop();
                    router.push('/kelas');
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
                recognition.start();
            };
        }
    }, [router]);

    return (
        <>
            <Navbar />
            <Hero />
            <CheckPermission />
        </>
    );
};

export default Beranda;
