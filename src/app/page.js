'use client';

// core
import { useRouter } from 'next/navigation';

// component
import Navbar from '@/components/organism/Navbar';
import Hero from '@/components/organism/Hero';
import CheckPermission from '@/components/organism/CheckPermission';

import { synth, speech } from '@/utils/textToSpeech';
import recognition from '@/utils/speechRecognition';

const Beranda = () => {
    const router = useRouter();

    if (typeof window !== 'undefined') {
        recognition.onresult = (event) => {
            const command = event.results[0][0].transcript.toLowerCase();

            if (command.includes('cari kelas')) {
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

    return (
        <>
            <Navbar />
            <Hero />
            <CheckPermission />
        </>
    );
};

export default Beranda;
