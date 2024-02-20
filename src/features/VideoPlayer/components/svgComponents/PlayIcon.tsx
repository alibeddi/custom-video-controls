import React, { Dispatch, SetStateAction } from 'react'

export default function PlayIcon({ setPlaying, className }: { setPlaying?: Dispatch<SetStateAction<boolean>>; className?: string }) {
    return (
        <svg onClick={setPlaying ? () => setPlaying(true) : () => ''} className={className || 'z-10 cursor-pointer'} xmlns="http://www.w3.org/2000/svg" width="52" height="53" viewBox="0 0 52 53" fill="none">
            <g clipPath="url(#clip0_5771_9483)">
                <path opacity="0.7" d="M50.4933 32.3166C53.6507 18.4827 45.2458 4.65007 31.7205 1.42063C18.1952 -1.80881 4.67125 6.78785 1.51385 20.6218C-1.64355 34.4558 6.7613 48.2884 20.2866 51.5178C33.8119 54.7473 47.3359 46.1506 50.4933 32.3166Z" fill="white" />
                <path d="M39.2689 26.4664L18.3594 12.4126C18.3898 33.6022 18.3594 23.1993 18.3594 40.5202L39.2689 26.4664Z" fill="#3C3939" />
            </g>
            <defs>
                <clipPath id="clip0_5771_9483">
                    <rect width="50.3065" height="51.4545" fill="white" transform="translate(0.863281 0.732422)" />
                </clipPath>
            </defs>
        </svg>
    )
}
