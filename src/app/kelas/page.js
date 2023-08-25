'use client';

// core
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

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

const Kelas = () => {
    const { data } = useSession();
    const router = useRouter();
    const token = data?.user?.token;

    const [kelas, setKelas] = useState([]);

    const handlePilihKelas = (idKelas) => {
        router.push(`/kelas/${idKelas}`);
    };

    useEffect(() => {
        if (token) {
            const fetchApi = async () => {
                const response = await getAllClassApi({ token });
                setKelas(response.data);
            };

            fetchApi();
        }
    }, [token]);

    useEffect(() => {
        if (kelas) {
            if (kelas.length > 0) {
                synth.cancel();
                synth.speak(speech('Selamat datang di Kelas.'));
                synth.speak(speech(`Ditemukan ${kelas.length} kelas tersedia.`));
            }
        }
    }, [kelas]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            recognition.onresult = (event) => {
                const command = event.results[0][0].transcript.toLowerCase();

                if (command.includes('pergi home')) {
                    recognition.stop();
                    router.push('/');
                } else if (command.includes('pergi rapor')) {
                    recognition.stop();
                    router.push('/rapor');
                } else if (command.includes('sebutkan kelas')) {
                    if (kelas.length > 0) {
                        synth.cancel();
                        synth.speak(speech(`Daftar kelas yaitu : `));
                        for (let i = 0; i < kelas.length; i++) {
                            synth.speak(speech(` ${kelas[i].name}`));
                        }
                    }
                } else if (command.includes('jumlah kelas')) {
                    if (kelas.length) {
                        synth.cancel();
                        synth.speak(speech(`Terdapat ${kelas.length} kelas.`));
                    }
                } else if (
                    command.includes('saya sekarang dimana') ||
                    command.includes('saya sekarang di mana') ||
                    command.includes('saya di mana') ||
                    command.includes('saya dimana')
                ) {
                    synth.cancel();
                    synth.speak(speech('Kita sedang di halaman kelas'));
                }

                console.log(event.results[0][0].transcript.toLowerCase());
            };

            recognition.onend = () => {
                recognition.start();
            };
        }
    }, [router, kelas]);

    return (
        <>
            <Navbar />
            <main style={{ height: 'calc(100vh - 90px)' }} className='mt-[90px] w-screen bg-[#F5F5F5] '>
                <div className='mx-auto  grid  max-w-screen-xl grid-cols-12'>
                    <div className='col-span-2 '>
                        <h1 className='text-title-3 font-bold'>Filter</h1>
                        <div className='mt-[50px] flex items-center gap-2'>
                            <input type='checkbox' id='check' />
                            <label htmlFor='check'>Mudah</label>
                        </div>
                        <div className='flex items-center gap-2 '>
                            <input type='checkbox' id='check' />
                            <label htmlFor='check'>Menengah</label>
                        </div>
                        <div className='flex items-center gap-2 '>
                            <input type='checkbox' id='check' />
                            <label htmlFor='check'>Sulit</label>
                        </div>
                    </div>
                    <div className='col-span-10 grid grid-cols-4 gap-[24px]  '>
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
                                              widthIcon={30}
                                              heightIcon={30}
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
        </>
    );
};

export default Kelas;
