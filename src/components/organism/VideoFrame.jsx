'use client';

import { useEffect, useRef } from 'react';
import YouTubePlayer from 'youtube-player';
import { synth, speech } from '@/utils/textToSpeech';

const VideoFrame = ({ playback, videoId, isPlaying, setPaused, setVideoEnded, setCurrenTimeVideo }) => {
    const playerRef = useRef(null);
   
    const handleVideoSize = async (player) => {
        try {
            const size = await player.getDuration();
            console.log(size);
        } catch (error) {
            console.log(error);
        }
    };

    const handleInitialPlay = (startTime = 1) => {
        const player = YouTubePlayer('player', {
            videoId: videoId,
            playerVars: {
                autoplay: 0,
                controls: 1,
                modestbranding: 1,
                showinfo: 0,
                rel: 0,
                fs: 1,
            },
        });

       

        playerRef.current = player;

        // Ambil waktu terakhir dari localStorage untuk video saat ini

        if ( playback > 0) {
            // player.seekTo(startTime);
            player.seekTo(playback);
            player.pauseVideo();
        } 

        // Ketika video diputar, simpan waktu saat video dimulai
        player.on('stateChange', async (event) => {
            if (event.data === 1 || event.data === 2) {
                const currentTime = await player.getCurrentTime();
                console.log('cur', currentTime);
                setCurrenTimeVideo(currentTime);
                return;
            }

            if (event.data === 0) {
                synth.speak(speech('Video sudah selesai'));
                setVideoEnded(true);
                console.log('Video selesai');
            }
        });
        

        handleVideoSize(player);
        
    };

    useEffect(() => {
        handleInitialPlay(playback);

        // event listener untuk mendeteksi keydown pada keyboard
        const handleKeyDown = (e) => {
            //Q key clicked
            if (e.keyCode === 81) {
                handlePlay();
            } else if (e.keyCode === 87) {
                handlePause();
            }
        };

        // if (playback > 0) {
        //     if (isReadyToPlay) {
        //          playerRef.current.seekTo(playback);
        //     }
        // }
        

        document.addEventListener('keydown', handleKeyDown);

        // hapus event listener saat komponen VideoFrame di-unmount
        return () => {
            document.removeEventListener('keydown', handleKeyDown);

            if (playerRef.current) {
                playerRef.current.destroy();
            }

            // unmount, simpan waktu terakhir untuk video saat ini
            // localStorage.setItem(`lastPlayedTime_${videoId}`, lastPlayedTimeRef.current.toString());
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [videoId, isPlaying]);

    const handlePause = () => {
        if (playerRef.current) {
            playerRef.current.pauseVideo();
            setPaused(true);
        }
    };

    const handlePlay = () => {
        if (playerRef.current) {
            playerRef.current.playVideo();
            setPaused(false);
            
        }
    };

    return <div id='player' className='h-full w-full' tabIndex='-1'></div>;
};

export default VideoFrame;
