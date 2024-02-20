import Image from 'next/image';
import React from 'react'
import Play from '../../layouts/Play';

export default function Play({ player, playing, setPlaying, showEndScreen, handleReplayClick }: Play) {
    return (
        <div className='cursor-pointer' onClick={() => {
            if (player?.current?.getInternalPlayer()?.playerInfo?.playerState === 1) {
                player?.current?.getInternalPlayer()?.pauseVideo()
                setPlaying(false)
            } else {
                player?.current?.getInternalPlayer()?.playVideo()
                setPlaying(true)
            }

        }}>
            {showEndScreen === false ? playing === false ? <Image src="/icons/play.svg" width={16} height={21} alt='play' /> : <Image src="/icons/pause.svg" width={25} height={21} alt='play' /> : <Image src="/icons/replay (1).svg" width={25} height={21} alt='play' onClick={handleReplayClick} />}

        </div>
    )
}
