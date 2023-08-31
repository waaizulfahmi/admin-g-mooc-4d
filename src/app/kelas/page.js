'use client';

// core
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import axios from 'axios';

// third party
import { useSession } from 'next-auth/react';

// components
import Navbar from '@/components/organism/Navbar';
import ArrowButton from '@/components/atoms/ArrowButton';

// apis
import { getAllClassApi } from '@/axios/user';

// utils
import { getImageFile } from '@/utils/getServerStorage';
import { synth, speech } from '@/utils/textToSpeech';
import recognition from '@/utils/speechRecognition';

// import { useSelector, useDispatch } from 'react-redux';
// import { getListening, speechRecognitionSlice } from '@/redux/speech-recognition';

const fetchKelasByLevel = async (idLevel, token) => {
    try {
        const kelasLevel = {
            1: 'mudah',
            2: 'menengah',
            3: 'sulit'
        }
        const response = await axios.get(`https://nurz.site/api/user/kelasByLevel/${idLevel}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.data.data.kelas.length) {
            synth.speak(speech(`Kelas dengan level ${kelasLevel[idLevel]} tidak ditemukan`));
            return []
        }

        if (response.data.data.kelas.length > 0) {
            synth.speak(speech(`Ditemukan kelas dengan level ${kelasLevel[idLevel]}`));
            for (let i = 0; i < response.data.data.kelas.length; i++) {
                synth.speak(speech(`kelas ${response.data.data.kelas[i].name}`));
            }
            return response.data.data.kelas
        }
    } catch (error) {
        console.log(error.message);
        synth.speak(speech('Kelas tidak ditemukan'));
    }
}

const Kelas = () => {
    const { data } = useSession();
    const router = useRouter();
    const token = data?.user?.token;
    const [speaking, setSpeaking] = useState(false);
    const [kelas, setKelas] = useState([]);
    const [isCari, setCari] = useState(false);

    const handlePilihKelas = (idKelas) => {
        router.push(`/kelas/${idKelas}`);
    };

    useEffect(() => {
        if (token) {
            const fetchApi = async () => {
                try {
                    const response = await getAllClassApi({ token });
                    setKelas(response.data);
                    synth.speak(speech(`Selamat datang di Kelas.\nDitemukan ${response.data.length} kelas tersedia.`));
                } catch (error) {
                    synth.speak(speech(`Kelas tidak ditemukan!`));
                }
            };
            fetchApi();
        }
    }, [token]);

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
            const cleanCommand = command?.replace('.', '');

            if (isCari) {
                if (token) {
                    synth.speak(speech(`Mencari ${command}`));
                    const fetchApi = async () => {
                        try {
                            const response = await axios.get(`https://nurz.site/api/user/kelasByName/${cleanCommand}`, {
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization: `Bearer ${token}`,
                                },
                            });

                            console.log(response.data);

                            if (!response.data.data.length) {
                                synth.speak(speech(`Kelas tidak ditemukan`));
                                setCari(false);
                                return;
                            }

                            if (response.data.data.length > 0) {
                                setKelas(response.data.data);
                                synth.speak(speech('Ditemukan kelas'));
                                for (let i = 0; i < response.data.data.length; i++) {
                                    synth.speak(speech(` ${response.data.data[i].name}`));
                                }
                                setCari(false);
                            }
                        } catch (error) {
                            setCari(false);
                            synth.speak(`Kelas tidak ditemukan`);
                        }
                    };
                    fetchApi();
                }
            }

            if (cleanCommand.includes('cari kelas')) {
                const level = cleanCommand.replace('cari kelas', '').trim().toLowerCase();
                if (level.includes('mudah')) {
                    if (token) {
                        const fetchApi = async () => {
                            const data = await fetchKelasByLevel(1, token)
                            setKelas(data)
                        }
                        fetchApi()
                    }
                } else if (level.includes('menengah')) {
                    if (token) {
                        const fetchApi = async () => {
                            const data = await fetchKelasByLevel(2, token)
                            setKelas(data)
                        }
                        fetchApi()
                    }
                } else if (level.includes('sulit')) {
                    if (token) {
                        const fetchApi = async () => {
                            const data = await fetchKelasByLevel(3, token)
                            setKelas(data)
                        }
                        fetchApi()
                    }
                }
            } else if (cleanCommand.includes('belajar')) {
                const kelasCommand = cleanCommand.replace('belajar', '').trim();
                const findKelas = kelas.find((k) => k.name.toLowerCase() === kelasCommand);
                if (!findKelas) {
                    synth.speak(speech('Kelas tidak ditemukan!'));
                    return
                }
                let utterance = speech(`Anda akan memasuki ruangan kelas ${findKelas.name}`);
                utterance.onend = () => {
                    recognition.stop();
                    router.push(`/kelas/${findKelas.name.toLowerCase()}`);
                };
                synth.speak(utterance);

            } else if (cleanCommand.includes('mode cari')) {
                let utterance = speech('Sedang dalam mode cari');
                utterance.onend = () => {
                    setCari(true);
                };
                synth.speak(utterance);
            } else if (cleanCommand.includes('pergi')) {
                if (cleanCommand.includes('beranda')) {
                    recognition.stop();
                    let utterance = speech('Anda akan menuju halaman Beranda');
                    utterance.onend = () => {
                        recognition.stop();
                        router.push('/');
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
            } else if (cleanCommand.includes('sebutkan kelas')) {
                if (kelas.length > 0) {
                    synth.speak(speech(`Daftar kelas yaitu : `));
                    for (let i = 0; i < kelas.length; i++) {
                        synth.speak(speech(` ${kelas[i].name}`));
                    }
                }
            } else if (cleanCommand.includes('jumlah kelas')) {
                if (kelas.length) {
                    synth.speak(speech(`Terdapat ${kelas.length} kelas.`));
                }
            } else if (
                cleanCommand.includes('saya sekarang dimana') ||
                cleanCommand.includes('saya sekarang di mana') ||
                cleanCommand.includes('saya di mana') ||
                cleanCommand.includes('saya dimana')
            ) {
                synth.speak(speech('Kita sedang di halaman kelas'));
            }

            console.log(cleanCommand);
        };

        recognition.onend = () => {
            recognition.start();
        };
    }, [router, kelas, speaking, isCari, token]);

    return (
        <div className='h-screen bg-[#EDF3F3]'>
            <Navbar />
            <main style={{ height: 'calc(100vh - 90px)' }} className='w-screen bg-[#EDF3F3] pt-[90px] '>
                <div className='grid max-w-screen-xl grid-cols-12 mx-auto'>
                    <div className='col-span-3 '>
                        <h1 className='text-[30px] font-bold leading-[30px]'>Sort</h1>
                        <div className='mt-[30px] flex flex-col gap-[18px] '>
                            <div className='flex items-center gap-2'>
                                <input type='checkbox' id='check' className='h-[28px] w-[28px]' />
                                <label htmlFor='check' className='font-bold'>
                                    Mudah
                                </label>
                            </div>
                            <div className='flex items-center gap-2 '>
                                <input type='checkbox' id='check' className='h-[28px] w-[28px]' />
                                <label htmlFor='check' className='font-bold'>
                                    Menengah
                                </label>
                            </div>
                            <div className='flex items-center gap-2 '>
                                <input type='checkbox' id='check' className='h-[28px] w-[28px]' />
                                <label htmlFor='check' className='font-bold'>
                                    Sulit
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className='col-span-9 grid grid-cols-4 gap-[24px]  '>
                        {kelas.length
                            ? kelas.map((kelasData, index) => {
                                return (
                                    <div
                                        key={index}
                                        className='relative h-[400px] rounded-rad-7  bg-white  p-[14px] shadow-lg lg:col-span-1'>
                                        <div className='relative  h-[200px] w-full overflow-hidden rounded-rad-7'>
                                            <Image
                                                alt=''
                                                src={getImageFile(kelasData.image)}
                                                fill
                                                style={{ objectFit: 'cover' }}
                                            />
                                        </div>
                                        <h1 className='mt-[14px] text-body-2 font-bold'>{kelasData.name}</h1>
                                        <div className='mt-[46px] flex items-center gap-[10px]'>
                                            <Image alt='' src={'/images/star.svg'} width={16} height={16} />
                                            <Image alt='' src={'/images/star.svg'} width={16} height={16} />
                                            <Image alt='' src={'/images/star.svg'} width={16} height={16} />
                                            <Image alt='' src={'/images/star.svg'} width={16} height={16} />
                                            <Image alt='' src={'/images/star.svg'} width={16} height={16} />
                                            <span>(10)</span>
                                        </div>
                                        <ArrowButton
                                            onClick={() => handlePilihKelas(kelasData.id_kelas)}
                                            directionIcon={'right'}
                                            className='absolute bottom-[16px] right-[16px] p-[10px]'
                                        />
                                    </div>
                                );
                            })
                            : null}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Kelas;
