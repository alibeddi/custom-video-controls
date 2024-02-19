import Image from 'next/image'
import React from 'react'

interface SoundControl {
    handleVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    player: React.RefObject<any>;
    muted: boolean;
    setMute: React.Dispatch<React.SetStateAction<boolean>>;
    volume: number;
}
export default function SoundControl({ volume, handleVolumeChange, muted, player, setMute }: SoundControl) {
    return (
        <>
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
        </>
    )
}
