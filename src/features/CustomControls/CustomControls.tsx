'use client'

import React, { forwardRef, useEffect, useRef } from 'react';

import FullScreen from './components/FullScreen/FullScreen';
import Image from 'next/image';
import Play from './components/Play/Play';
import ProgressLine from './components/ProressLine/ProgressLine';
import SoundControl from './components/SoundControl/SoundControl';
import Timer from './components/Timer/Timer';
import VideoControlsProps from './layouts/CustomControls';

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
                    <SoundControl volume={volume} muted={muted} setMute={setMute} handleVolumeChange={handleVolumeChange} player={player} />
                </div>
                <div className='w-[10rem] flex justify-between items-center max-[450px]:justify-center gap-1'>

                    <FullScreen wrapper={wrapper} />
                    <Timer progress={progress} />
                </div>
            </div>
            <ProgressLine road={road} reseizer={reseizer} progress={progress} prog={prog} />

        </div>
    )
    CustomControls.displayName = 'CustomControls'
})
export default CustomControls









