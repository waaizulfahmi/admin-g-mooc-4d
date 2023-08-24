'use client';

import { useEffect, useRef } from 'react';
import YouTubePlayer from 'youtube-player';
// import PropTypes from 'prop-types';

const VideoFrame = ({ videoId, isPlaying, setVideoEnded }) => {
    const playerRef = useRef(null);
    const lastPlayedTimeRef = useRef(0);

    const getLastPlayedTime = () => {
        const lastTime = localStorage.getItem(`lastPlayedTime_${videoId}`);
        return lastTime ? parseFloat(lastTime) : 0;
    };
    const handleVideoSize = async (player) => {
        try {
            const size = await player.getDuration();
            console.log(size);
        } catch (error) {}
    };

    const handleInitialPlay = () => {
        const player = YouTubePlayer('player', {
            videoId: videoId,
            playerVars: {
                autoplay: isPlaying ? 1 : 0,
                controls: 1,
                modestbranding: 1,
                showinfo: 0,
                rel: 0,
                fs: 1,
            },
        });

        playerRef.current = player;

        // Ambil waktu terakhir dari localStorage untuk video saat ini
        lastPlayedTimeRef.current = getLastPlayedTime();
        player.seekTo(lastPlayedTimeRef.current);

        // Ketika video diputar, simpan waktu saat video dimulai
        player.on('stateChange', async (event) => {
            if (event.data === 1 || event.data === 2) {
                const currentTime = await player.getCurrentTime();
                console.log('cur', currentTime);
                lastPlayedTimeRef.current = currentTime; // Update played time
                localStorage.setItem(`lastPlayedTime_${videoId}`, currentTime);
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
        handleInitialPlay();

        // event listener untuk mendeteksi keydown pada keyboard
        const handleKeyDown = (e) => {
            //Q key clicked
            if (e.keyCode === 81) {
                handlePlay();
            } else if (e.keyCode === 87) {
                handlePause();
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        // hapus event listener saat komponen VideoFrame di-unmount
        return () => {
            document.removeEventListener('keydown', handleKeyDown);

            if (playerRef.current) {
                playerRef.current.destroy();
            }

            // unmount, simpan waktu terakhir untuk video saat ini
            localStorage.setItem(`lastPlayedTime_${videoId}`, lastPlayedTimeRef.current.toString());
        };
    }, [videoId, isPlaying]);

    const handlePause = () => {
        if (playerRef.current) {
            playerRef.current.pauseVideo();
        }
    };

    const handlePlay = () => {
        if (playerRef.current) {
            playerRef.current.playVideo();
        }
    };

    return <div id='player' className='lg:rounded-rad-5' tabIndex='-1'></div>;
};

export default VideoFrame;
