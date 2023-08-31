'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { synth, speech } from '@/utils/textToSpeech';
import recognition from '@/utils/speechRecognition';

const Test = () => {
    const [speaking, setSpeaking] = useState(false);
    const router = useRouter();

    useEffect(() => {
        try {
            recognition.start();
        } catch (error) {
            recognition.stop();
        }
    }, []);

    useEffect(() => {
        recognition.onresult = (event) => {
            const command = event.results[0][0].transcript.toLowerCase();

            if (command.includes('pergi home')) {
                recognition.stop();
                let utterance = speech('Anda akan pergi ke Home');
                setSpeaking(true);
                // dispatch(setListening(true));

                utterance.onend = () => {
                    recognition.stop();
                    router.push('/');
                };
                synth.speak(utterance);
            } else if (command.includes('pergi rapor')) {
                recognition.stop();
                let utterance = speech('Anda akan pergi ke Rapor');
                setSpeaking(true);
                // dispatch(setListening(true));

                utterance.onend = () => {
                    recognition.stop();
                    router.push('/rapor');
                };
                synth.speak(utterance);
            } else if (
                command.includes('saya sekarang dimana') ||
                command.includes('saya sekarang di mana') ||
                command.includes('saya di mana') ||
                command.includes('saya dimana')
            ) {
                recognition.stop();
                let utterance = speech('Kita sedang di halaman utama');
                setSpeaking(true);
                // dispatch(setListening(true));
                utterance.onend = () => {
                    recognition.start();
                    setSpeaking(false);
                    // dispatch(setListening(false));
                };
                synth.speak(utterance);
            }

            console.log(event.results[0][0].transcript.toLowerCase());
        };

        recognition.onend = () => {
            recognition.start();
        };
    }, [router, speaking]);

    return (
        <div>
            <h1>Hello World</h1>
        </div>
    );
};

export default Test;
