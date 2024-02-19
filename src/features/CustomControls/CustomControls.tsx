'use client'

import React, { forwardRef, useEffect, useRef } from 'react';

import Image from 'next/image';
import Play from './components/Pause/Play';

interface VideoControlsProps {
    wrapper: React.RefObject<HTMLDivElement>;
    player: React.RefObject<any>;
    progress: {
        duration: number;
        playedSeconds: number;
    };
    playing: boolean;
    setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
    muted: boolean;
    setMute: React.Dispatch<React.SetStateAction<boolean>>;
    setVolume: React.Dispatch<React.SetStateAction<number>>;
    volume: number;
    showEndScreen: boolean;
    handleReplayClick: any
}
const CustomControls: React.FC<VideoControlsProps> = forwardRef(({
    wrapper,
    player,
    progress,
    playing,
    setPlaying,
    muted,
    setMute,
    setVolume,
    volume,
    showEndScreen,
    handleReplayClick
}, ref) => {
    const reseizer = useRef<HTMLDivElement>(null);
    const road = useRef<HTMLDivElement>(null);
    const prog = useRef<HTMLDivElement>(null);

    const duration = progress.duration;

    useEffect(() => {
        if (reseizer.current) {
            reseizer.current.addEventListener('mousedown', main);
        }

        function main(e: MouseEvent) {
            const iframe = wrapper.current?.querySelector('iframe');
            const width = road.current?.getBoundingClientRect().width || 0;
            const x = road.current?.getBoundingClientRect().x || 0;

            if (iframe) {
                iframe.style.pointerEvents = 'none';
            }

            function resize(e: MouseEvent) {
                if (prog.current) {
                    prog.current.style.width = `${((e.clientX - x) / width) * 100}%`;
                }

                if (player.current?.getInternalPlayer()) {
                    player.current?.seekTo(
                        ((e.clientX - x) / width) * duration,
                        'seconds'
                    );
                }
            }

            window.addEventListener('mousemove', resize);

            window.addEventListener('mouseup', () => {
                if (iframe) {
                    iframe.style.pointerEvents = 'auto';
                }
                window.removeEventListener('mousemove', resize);
            });
        }
    }, [duration, wrapper, player]);

    const forward = () => {
        if (prog.current) {
            const w = parseFloat(prog.current.style.width || '0');
            const s = ((w + 5) / 100) * duration;
            prog.current.style.width = w + 5 + '%';

            if (player.current?.getInternalPlayer()) {
                player.current.seekTo(s, 'seconds', true);
            }
        }
    };

    const back = () => {
        if (prog.current) {
            const w = parseFloat(prog.current.style.width || '0');
            const s = ((w - 5) / 100) * duration;
            prog.current.style.width = w - 5 + '%';

            if (player.current?.getInternalPlayer()) {
                player.current.seekTo(s, 'seconds', true);
            }
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(prev => newVolume);

        if (player.current?.getInternalPlayer()) {
            player.current.props.volume
        }
    };
    return (
        <div className='w-full bg-[#fff] h-[59px] relative flex items-center flex-col-reverse'>
            <div className='w-full flex flex-row-reverse justify-between items-center p-4 max-[450px]:px-1'>
                <div className='w-[8rem] flex justify-around items-center max-[500px]:justify-end max-[500px]:px-4'>
                    <div className=' cursor-pointer max-[500px]:hidden' onClick={forward}>
                        <Image src="/icons/next.svg" width={25} height={21} alt='next' />
                    </div>
                    <Play player={player} playing={playing} setPlaying={setPlaying} showEndScreen={showEndScreen} handleReplayClick={handleReplayClick} />
                    <div className='cursor-pointer max-[500px]:hidden' onClick={back}>
                        <Image src="/icons/previous.svg" width={25} height={21} alt='previous' />
                    </div>
                </div>
                <div className='w-[8rem] flex justify-center items-center gap-2 max-[550px]:hidden'>
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={volume}
                        className='volume bg-black w-[100px] h-[20px] z-10 cursor-pointer'
                        onChange={handleVolumeChange}
                        dir='ltr'
                    />
                    <div className=' z-10 cursor-pointer' onClick={() => {
                        if (muted)
                            return player.current?.internalPlayer?.unMute().then(() => setMute(false))
                        player.current?.internalPlayer?.mute().then(() => setMute(true))
                    }}>
                        {muted ? <Image src="/icons/Mute_Icon.svg" alt='mute' width={22} height={22} className='relative top[-2px] cursor-pointer' /> : <Image src="/icons/volume.svg" width={20} height={21} alt='volume' />}
                    </div>
                </div>
                <div className='w-[10rem] flex justify-between items-center max-[450px]:justify-center gap-1'>

                    <div
                        className=' cursor-pointer'
                        onClick={() => {
                            const iframe = wrapper.current?.querySelector("iframe");
                            if (iframe)
                                iframe.requestFullscreen()
                        }}>
                        <Image src="/icons/fullscreen.svg" width={30} height={21} alt='play' />
                    </div>
                    <div className='right-[12%] top-[45%] max-[450px]:text-[0.8rem]'>
                        {`${Math.floor(duration / 60)}:${Math.floor(duration % 60) < 10 ? '0' + Math.floor(duration % 60) : Math.floor(duration % 60)} / 
            ${(Math.floor(progress.playedSeconds / 60)).toString().padStart(2, '0')}:${(Math.floor(progress.playedSeconds % 60)).toString().padStart(2, '0')} `}
                    </div>
                </div>
            </div>
            <div className='h-[5px] bg-[#FEAF3B]  w-[100%] ' ref={road} dir='ltr'>
                <div className='h-[5px] bg-[#FEAF3B] flex justify-end items-center'
                    ref={prog}
                    style={{ width: `${progress.playedSeconds / duration * 100}%` }}
                >
                    <div className='bg-[#E68900] h-[13px] rounded-full cursor-pointer px-[6.5px] translate-x-1' ref={reseizer}></div>
                </div>
            </div>

        </div>
    )
    CustomControls.displayName = 'CustomControls'
})
export default CustomControls









