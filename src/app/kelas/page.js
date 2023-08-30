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

const Kelas = () => {
    const { data } = useSession();
    const router = useRouter();
    const token = data?.user?.token;
    const [speaking, setSpeaking] = useState(false);
    const [kelas, setKelas] = useState([]);
    const [isCari, setCari] = useState(false);
    const [isLevel, setLevel] = useState(false);
    // const [listening, setListening] = useState(false);

    const handlePilihKelas = (idKelas) => {
        router.push(`/kelas/${idKelas}`);
    };

    useEffect(() => {
        if (token) {
            const fetchApi = async () => {
                try {
                    const response = await getAllClassApi({ token });
                    setKelas(response.data);
                    synth.cancel();
                    synth.speak(speech(`Selamat datang di Kelas.\nDitemukan ${response.data.length} kelas tersedia.`));
                } catch (error) {
                    synth.cancel();
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
                            setSpeaking(false);
                            synth.speak(`Kelas tidak ditemukan`);
                        }
                    };
                    fetchApi();
                }
            }

            if (cleanCommand.includes('cari kelas')) {
                const level = cleanCommand.replace('cari kelas', '').trim().toLowerCase();
                if (level.includes('mudah')) {
                    // console.log('buat cari ', cleanCommand);
                    // console.log('my level', 'mudah');
                    if (token) {
                        // synth.speak(speech(`Mencari ${command}`));
                        const fetchApi = async () => {
                            try {
                                const response = await axios.get(`https://nurz.site/api/user/kelasByLevel/1`, {
                                    headers: {
                                        'Content-Type': 'application/json',
                                        Authorization: `Bearer ${token}`,
                                    },
                                });

                                console.log(response.data);

                                if (!response.data.data.kelas.length) {
                                    synth.speak(speech(`Kelas tidak ditemukan`));
                                    // setCari(false);
                                    return;
                                }

                                if (response.data.data.kelas.length > 0) {
                                    setKelas(response.data.data.kelas);
                                    synth.speak(speech('Ditemukan kelas dengan level mudah'));
                                    for (let i = 0; i < response.data.data.kelas.length; i++) {
                                        synth.speak(speech(`kelas ${response.data.data.kelas[i].name}`));
                                    }
                                    // setCari(false);
                                }
                            } catch (error) {
                                // setCari(false);
                                // setSpeaking(false);
                                synth.speak(`Kelas tidak ditemukan`);
                            }
                        };
                        fetchApi();
                    }
                } else if (level.includes('menengah')) {
                    // console.log('my level', 'menengah');
                    // console.log('buat cari ', cleanCommand);
                    // console.log('my level', 'mudah');
                    if (token) {
                        // synth.speak(speech(`Mencari ${command}`));
                        const fetchApi = async () => {
                            try {
                                const response = await axios.get(`https://nurz.site/api/user/kelasByLevel/2`, {
                                    headers: {
                                        'Content-Type': 'application/json',
                                        Authorization: `Bearer ${token}`,
                                    },
                                });

                                console.log(response.data);

                                if (!response.data.data.kelas.length) {
                                    synth.speak(speech(`Kelas tidak ditemukan`));
                                    // setCari(false);
                                    return;
                                }

                                if (response.data.data.kelas.length > 0) {
                                    setKelas(response.data.data.kelas);
                                    synth.speak(speech('Ditemukan kelas dengan level mudah'));
                                    for (let i = 0; i < response.data.data.kelas.length; i++) {
                                        synth.speak(speech(`kelas ${response.data.data.kelas[i].name}`));
                                    }
                                    // setCari(false);
                                }
                            } catch (error) {
                                // setCari(false);
                                // setSpeaking(false);
                                synth.speak(`Kelas tidak ditemukan`);
                            }
                        };
                        fetchApi();
                    }
                } else if (level.includes('sulit')) {
                    // console.log('my level', 'sulit');
                    // console.log('my level', 'menengah');
                    // console.log('buat cari ', cleanCommand);
                    // console.log('my level', 'mudah');
                    if (token) {
                        // synth.speak(speech(`Mencari ${command}`));
                        const fetchApi = async () => {
                            try {
                                const response = await axios.get(`https://nurz.site/api/user/kelasByLevel/3`, {
                                    headers: {
                                        'Content-Type': 'application/json',
                                        Authorization: `Bearer ${token}`,
                                    },
                                });

                                console.log(response.data);

                                if (!response.data.data.kelas.length) {
                                    synth.speak(speech(`Kelas tidak ditemukan`));
                                    // setCari(false);
                                    return;
                                }

                                if (response.data.data.kelas.length > 0) {
                                    setKelas(response.data.data.kelas);
                                    synth.speak(speech('Ditemukan kelas dengan level mudah'));
                                    for (let i = 0; i < response.data.data.kelas.length; i++) {
                                        synth.speak(speech(`kelas ${response.data.data.kelas[i].name}`));
                                    }
                                    // setCari(false);
                                }
                            } catch (error) {
                                // setCari(false);
                                // setSpeaking(false);
                                synth.speak(`Kelas tidak ditemukan`);
                            }
                        };
                        fetchApi();
                    }
                }
                // console.log('test', level);
            } else if (cleanCommand.includes('belajar')) {
                const kelas = cleanCommand.replace('belajar', '').trim();
                console.log('dapet', kelas);
            } else if (cleanCommand.includes('mode cari')) {
                let utterance = speech('Sedang dalam mode cari');

                utterance.onend = () => {
                    setCari(true);
                };

                synth.speak(utterance);
            } else if (cleanCommand.includes('pergi home')) {
                let utterance = speech('Anda akan pergi ke Beranda');
                setSpeaking(true);
                recognition.stop();
                utterance.onend = () => {
                    router.push('/');
                };
                synth.cancel();
                synth.speak(utterance);
            } else if (cleanCommand.includes('pergi rapor')) {
                let utterance = speech('Anda akan pergi ke Rapor');
                setSpeaking(true);
                recognition.stop();
                utterance.onend = () => {
                    router.push('/rapor');
                };
                synth.cancel();
                synth.speak(utterance);
            } else if (cleanCommand.includes('sebutkan kelas')) {
                if (kelas.length > 0) {
                    synth.cancel();
                    synth.speak(speech(`Daftar kelas yaitu : `));
                    for (let i = 0; i < kelas.length; i++) {
                        synth.speak(speech(` ${kelas[i].name}`));
                    }
                }
            } else if (cleanCommand.includes('jumlah kelas')) {
                if (kelas.length) {
                    synth.cancel();
                    synth.speak(speech(`Terdapat ${kelas.length} kelas.`));
                }
            } else if (
                cleanCommand.includes('saya sekarang dimana') ||
                cleanCommand.includes('saya sekarang di mana') ||
                cleanCommand.includes('saya di mana') ||
                cleanCommand.includes('saya dimana')
            ) {
                synth.cancel();
                synth.speak(speech('Kita sedang di halaman kelas'));
            }

            console.log(cleanCommand);
        };

        recognition.onend = () => {
            if (!speaking) {
                recognition.start();
            }
        };
    }, [router, kelas, speaking, isCari, token]);

    return (
        <div className='h-screen bg-[#EDF3F3]'>
            <Navbar />
            <main style={{ height: 'calc(100vh - 90px)' }} className='w-screen bg-[#EDF3F3] pt-[90px] '>
                <div className='mx-auto grid max-w-screen-xl grid-cols-12'>
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
