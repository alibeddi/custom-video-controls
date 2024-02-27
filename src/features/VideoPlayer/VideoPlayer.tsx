'use client'

import React, { useRef, useState } from 'react';

import ClientOnly from '@/hooks/ClientOnly';
import Image from 'next/image';
import PlayIcon from './components/svgComponents/PlayIcon';
import ReactPlayer from 'react-player/youtube';
import Replay from '@icons/replay.svg'
import { Spin } from 'antd';
import VideoControls from '../CustomControls/CustomControls';
import { twMerge } from 'tailwind-merge';

type VideoContainerProps = {
    video: string;
    styles?: React.CSSProperties;
    thumbnail?: string;
    wrapperClassName?: string;
    containerClassName?: string;
};

const VideoContainer: React.FC<VideoContainerProps> = ({ video, styles, wrapperClassName, containerClassName }) => {

    const newWrapperClassName = twMerge('w-full min-h-[400px] relative', wrapperClassName)
    const newContainerClassName = twMerge('w-full min-h-[500px] rounded-[25px] p-4 flex flex-col justify-center items-center bg-[#fff] shadow-primary', containerClassName)
    const player = useRef<ReactPlayer | null>(null);
    const [playing, setPlaying] = useState<boolean>(false);
    const [showEndScreen, setShowEndScreen] = useState(false);
    const [muted, setMute] = useState<boolean>(false);
    const [volume, setVolume] = useState<number>(50);
    const [progress, setProgress] = useState<{ playedSeconds: number; loaded: number; duration: number }>({
        playedSeconds: 0,
        loaded: 0,
        duration: 0,
    });
    const wrapper = useRef<HTMLDivElement | null>(null);
    const handleReady = (playerInstance: any) => {
        if (!playerInstance) return;

        const duration = playerInstance.getDuration();
        setProgress({ ...progress, duration });
    };

    const handleVideoEnd = () => {
        setShowEndScreen(true);
    }
    const handleReplayClick = () => {
        setShowEndScreen(false); // Hide the end screen
        setPlaying(true); // Start playing the video again

        if (player.current) {
            player.current.seekTo(0); // Go back to the start of the video
        }
    };


    return (
        <>
            <div
                className={newContainerClassName}
                ref={wrapper}
            >

                <ClientOnly>
                    <div className={newWrapperClassName}>

                        {showEndScreen ?
                            <div className='bg-black flex items-center justify-center w-full h-[25rem] '
                            >
                                <Image src={Replay} width={100} height={100} alt='replay icon' className='hover:animate-pulse cursor-pointer' onClick={handleReplayClick} />
                            </div>
                            :
                            <ReactPlayer
                                playIcon={<PlayIcon setPlaying={setPlaying} />}
                                url={`${video}?modestbranding=1`}
                                related={false}
                                // light={ thumbnail && <Image src={ thumbnail || "" } fill={ true } alt='thumbnail image' className='object-cover ' onClick={ () => setPlaying( true ) } /> }
                                playing={playing}
                                fallback={<section className='flex items-center justify-center w-full h-full' >
                                    <Spin size='large' />
                                </section>}
                                controls={false}
                                style={{
                                    borderRadius: '25px',
                                    height: '100% !important',
                                    width: '100% !important',
                                    minHeight: '400px',
                                    ...styles,

                                }}
                                ref={player}
                                className="video"
                                onReady={handleReady}
                                volume={volume / 100}
                                onProgress={(e: any) => setProgress(
                                    {
                                        ...progress,
                                        playedSeconds: e.playedSeconds
                                    }
                                )}

                                onPlaybackRateChange={(e: any) => { console.log(e) }}
                                onEnded={handleVideoEnd}
                            />}

                    </div>
                    <VideoControls
                        volume={volume}
                        setVolume={setVolume}
                        player={player}
                        progress={progress}
                        playing={playing}
                        setPlaying={setPlaying}
                        muted={muted}
                        wrapper={wrapper}
                        setMute={setMute}
                        showEndScreen={showEndScreen}
                        handleReplayClick={handleReplayClick}
                    />
                </ClientOnly>
            </div>
        </>
    );
};

export default VideoContainer;
