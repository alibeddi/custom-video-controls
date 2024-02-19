import Image from 'next/image';
import React from 'react'

interface FullScreen {
    wrapper: React.RefObject<HTMLDivElement>;
}

export default function FullScreen({ wrapper }: FullScreen) {
    return (
        <div
            className=' cursor-pointer'
            onClick={() => {
                const iframe = wrapper.current?.querySelector("iframe");
                if (iframe)
                    iframe.requestFullscreen()
            }}>
            <Image src="/icons/fullscreen.svg" width={30} height={21} alt='play' />
        </div>
    )
}
