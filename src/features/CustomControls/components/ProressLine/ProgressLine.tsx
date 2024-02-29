import React from 'react'
import ProgressLine from '../../types/ProgressLine'

export default function ProgressLine({
    road,
    prog,
    progress,
    reseizer
}: ProgressLine) {
    const duration = progress.duration
    return (
        <div className='h-[5px] bg-[#FEAF3B]  w-[100%] ' ref={road} dir='ltr'>
            <div className='h-[5px] bg-[#FEAF3B] flex justify-end items-center'
                ref={prog}
                style={{ width: `${progress.playedSeconds / duration * 100}%` }}
            >
                <div className='bg-[#E68900] h-[13px] rounded-full cursor-pointer px-[6.5px] translate-x-1' ref={reseizer}></div>
            </div>
        </div>
    )
}
