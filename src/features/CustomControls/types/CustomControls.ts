export default interface VideoControlsProps {
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