'use client';

import { useEffect, useRef, useState } from 'react';
import YouTubePlayer from 'youtube-player';

const VideoFrame = ({ playback = 200, videoId, isPlaying, setPaused, setPlaying, setVideoEnded, setCurrenTimeVideo }) => {
    const playerRef = useRef(null);
    const lastPlayedTimeRef = useRef(0);
    // const [playback, setPlayback] = useState(0);

    // const getLastPlayedTime = () => {
    //     const lastTime = localStorage.getItem(`lastPlayedTime_${videoId}`);
    //     return lastTime ? parseFloat(lastTime) : 0;
    // };
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
                // autoplay: isPlaying ? 1 : 0,
                autoplay: 0,
                controls: 1,
                modestbranding: 1,
                showinfo: 0,
                rel: 0,
                fs: 1,
            },
        });

        // isPlaying ? player.playVideo() : player.pauseVideo();

        playerRef.current = player;

        // Ambil waktu terakhir dari localStorage untuk video saat ini
        // lastPlayedTimeRef.current = getLastPlayedTime();
        // player.seekTo(lastPlayedTimeRef.current);

        if (startTime >= playback) {
            player.seekTo(startTime);
        } else {
            player.seekTo(playback);
        }

        // Ketika video diputar, simpan waktu saat video dimulai
        player.on('stateChange', async (event) => {
            if (event.data === 1 || event.data === 2) {
                const currentTime = await player.getCurrentTime();
                console.log('cur', currentTime);
                // lastPlayedTimeRef.current = currentTime; // Update played time
                // localStorage.setItem(`lastPlayedTime_${videoId}`, currentTime);
                setCurrenTimeVideo(currentTime);
                return;
            }

            if (event.data === 0) {
                setVideoEnded(true);
                console.log('Video selesai');
            }
        });
        console.log('====================================');

        handleVideoSize(player);
        // player.stopVideo().then(() => {
        //     // Every function returns a promise that is resolved after the target function has been executed.

        //     console.log("SUdah selesai");
        // });

        // player.nextVideo().then

        console.log('====================================');
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
        // playerRef.current.playVideo();

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
            // setPlaying(false);
        }
    };

    const handlePlay = () => {
        if (playerRef.current) {
            playerRef.current.playVideo();
            // playerRef.current.seekTo(playback);
            setPaused(false);
            // setPlaying(true);
        }
    };

    return <div id='player' className='h-full w-full' tabIndex='-1'></div>;
};

export default VideoFrame;
