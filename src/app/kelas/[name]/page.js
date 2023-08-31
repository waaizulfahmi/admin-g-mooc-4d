'use client';

// core
import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';

// third party
import { useSession } from 'next-auth/react';

// component
import ArrowButton from '@/components/atoms/ArrowButton';
import VideoFrame from '@/components/organism/VideoFrame';

// apis
import { getClassById, getOrCreateHistory } from '@/axios/user';
import HeroIcon from '@/components/atoms/HeroIcon';
import NavbarButton from '@/components/molecules/NavbarButton';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import { MdPlayCircleOutline, MdOutlineQuestionAnswer } from 'react-icons/md';
import recognition from '@/utils/speechRecognition';
import axios from 'axios';
import { synth, speech } from '@/utils/textToSpeech';
import { getYoutubeVideoId } from '@/utils/getVideoId';

function PilihKelas() {
    // const videoRef = useRef(null);
    const { data } = useSession();
    const { name } = useParams();
    const token = data?.user?.token;
    const [speaking, setSpeaking] = useState(false);
    const [loadData, setLoadData] = useState(true);
    const [playback, setPlayback] = useState(10)

    // console.log('name', name);
    // console.log('token', token);
    const [isVideoEnded, setVideoEnded] = useState(false);
    const [isVideoPlaying, setVideoPlaying] = useState(false);
    const [isVideoPaused, setVideoPaused] = useState(false);
    const [currenTime, setCurrenTime] = useState(0);

    const [materi, setMateri] = useState([]);
    const [quiz, setQuiz] = useState([]);
    const [videoId, setVideoId] = useState('');
    const router = useRouter();

    const backToClass = () => {
        router.back();
    };

    useEffect(() => {
        try {
            recognition.start();
        } catch (error) {
            recognition.stop();
        }
    }, []);

    useEffect(() => {
        if (loadData) {
            if (token) {
                const fetchApi = async () => {
                    try {
                        const response = await axios.get(`https://nurz.site/api/user/enrollment/${name}`, {
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${token}`,
                            },
                        });

                        const materi = response.data.data.kelas.materi;
                        const quiz = response.data.data.kelas.quiz;
                        const activeMateri = response.data.data.kelas.materi.filter(
                            (materiItem) => materiItem.status === 'jalan',
                        );
                        const lastMateri = activeMateri[activeMateri.length - 1];

                        console.log('Materi : ', materi);
                        console.log('Last Materi : ', lastMateri);
                        setPlayback(lastMateri.playback)
                        setVideoId(getYoutubeVideoId(lastMateri.url));
                        setMateri(materi);
                        setQuiz(quiz);
                        synth.speak(
                            speech(
                                `Selamat datang di Kelas ${response.data.data.kelas.name}.\nDitemukan ${materi.length} materi, dan ${quiz.length} quiz. Untuk petunjuk, tekan tombol q untuk menjalankan video, dan tekan tombol w untuk pause video.`,
                            ),
                        );
                    } catch (error) {
                        console.log(error);
                    }
                };
                fetchApi();
            }
        }
        setLoadData(false);

    }, [token, name, loadData]);

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
                } else if (cleanCommand.includes('beranda')) {
                    recognition.stop();
                    let utterance = speech('Anda akan menuju halaman beranda');
                    utterance.onend = () => {
                        recognition.stop();
                        router.push('/test');
                    };  
                    synth.speak(utterance);
                }
            } else if (cleanCommand.includes('putar video')) {
                let utterance = speech(`Anda akan memutar video`);

                utterance.onend = () => {
                    setVideoPlaying(true);
                };

                synth.speak(utterance);
            } else if (cleanCommand.includes('load')) {
                let utterance = speech(`Anda akan load halaman`);

                utterance.onend = () => {
                    setLoadData(true);
                };

                synth.speak(utterance);
            } else if (
                cleanCommand.includes('saya sekarang dimana') ||
                cleanCommand.includes('saya sekarang di mana') ||
                cleanCommand.includes('saya di mana') ||
                cleanCommand.includes('saya dimana')
            ) {
                synth.cancel();
                synth.speak(speech('Kita sedang di halaman pembelajaran'));
            }
            console.log(cleanCommand);
        };

        recognition.onend = () => {
            recognition.start();
        };
    }, [speaking]);

    console.log('video runn', currenTime);
    console.log('video pause', isVideoPaused);
    console.log('video playing', isVideoPlaying);

    return (
        <div className='h-screen bg-[#EDF3F3]'>
            <nav className={` fixed top-0 z-20 w-screen  bg-[#EDF3F3] py-[20px]`}>
                <div className='mx-auto flex max-w-screen-xl items-center justify-between '>
                    <HeroIcon alt='icons' imgUrl={'/images/voice-icon.svg'} height={100} width={100} />
                    <div className=' flex items-center gap-[200px]'>
                        <div className='flex items-center gap-[14px]'>
                            <div className='flex h-[20px] w-[20px] items-center justify-center rounded-full  border-[4px] border-black  p-3 font-bold'>
                                C
                            </div>{' '}
                            <span className=' text-[16px] font-bold leading-[20px]'>0</span>
                        </div>
                        <NavbarButton />
                    </div>
                </div>
            </nav>
            <div
                // style={{ height: 'calc(100vh - 100px)' }}
                className='mx-auto grid  h-screen  max-w-screen-xl grid-cols-12 gap-5 pt-[100px]'>
                <div className='col-span-3  rounded-[20px]  bg-white p-[24px]'>
                    <div className='rounded-[10px] bg-[#E7A645] p-[16px]'>
                        <h1 className='font-bold text-white'>Persiapan Kelas</h1>
                        <p className='text-[12px] text-white'>Trailer Kelas</p>
                    </div>

                    <div className='mt-[20px]  rounded-[10px] bg-[#E7A645] p-[16px]'>
                        <div>
                            <h1 className='font-bold text-white'>Materi</h1>
                            <p className='text-[12px] text-white'>3 Video</p>
                        </div>
                        <div className='mt-[18px] flex flex-col gap-3'>
                            {materi &&
                                materi.map((item, index) => {
                                    return (
                                        <div
                                            // ref={item.status === 'jalan' ? videoRef : null}
                                            // onClick={item.status === 'jalan' ? handlePlayVideo : undefined}
                                            key={index}
                                            className={`${item.status === 'sudah' || item.status === 'jalan'
                                                ? 'bg-[#CF8618] text-white'
                                                : 'bg-white text-[#CF8618]'
                                                }  flex items-center gap-[8px] rounded-[10px]  p-[20px] font-bold  `}>
                                            <MdPlayCircleOutline className='h-[20px] w-[20px]' /> <span>Video 2</span>
                                        </div>
                                    );
                                })}
                        </div>
                        <div className='mt-[18px]'>
                            <h1 className='font-bold text-white'>Quiz</h1>
                            <p className='text-[12px] text-white'>1 soal</p>
                        </div>
                        <div className='mt-[18px] flex flex-col gap-3'>
                            <div className='flex items-center gap-[8px] rounded-[10px] bg-white p-[20px] font-bold text-[#CF8618]'>
                                <MdOutlineQuestionAnswer className='h-[20px] w-[20px]' /> <span>Soal</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-span-9 h-[500px] w-full overflow-hidden rounded-[20px]'>
                    {/* <div className='relative h-[500px] w-full overflow-hidden rounded-[20px]'>
                        <Image alt='' src={'/images/video-player.png'} fill />
                    </div> */}
                    {videoId && (
                        <VideoFrame
                            playback={playback}
                            setCurrenTimeVideo={setCurrenTime}
                            videoId={videoId}
                            isPlaying={isVideoPlaying}
                            setVideoEnded={setVideoEnded}
                            setPaused={setVideoPaused}
                            setPlaying={setVideoPlaying}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}

export default PilihKelas;
