import React from 'react'

interface Timer {
    progress: {
        duration: number;
        playedSeconds: number;
    };
}
export default function Timer({ progress }: Timer) {
    const duration = progress.duration;
    return (
        <div className='right-[12%] top-[45%] max-[450px]:text-[0.8rem]'>
            {`${Math.floor(duration / 60)}:${Math.floor(duration % 60) < 10 ? '0' + Math.floor(duration % 60) : Math.floor(duration % 60)} / 
            ${(Math.floor(progress.playedSeconds / 60)).toString().padStart(2, '0')}:${(Math.floor(progress.playedSeconds % 60)).toString().padStart(2, '0')} `}
        </div>
    )
}
