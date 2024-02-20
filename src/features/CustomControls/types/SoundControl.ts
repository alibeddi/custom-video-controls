export default interface SoundControl {
    handleVolumeChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    player: React.RefObject<any>;
    muted: boolean;
    setMute: React.Dispatch<React.SetStateAction<boolean>>;
    volume: number;
}