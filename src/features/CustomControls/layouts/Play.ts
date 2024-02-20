export default interface Play {
    playing: boolean;
    setPlaying: React.Dispatch<React.SetStateAction<boolean>>;
    player: React.RefObject<any>;
    showEndScreen: boolean;
    handleReplayClick: any;
}