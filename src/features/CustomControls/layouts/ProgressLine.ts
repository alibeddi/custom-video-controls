export default interface ProgressLine {
    progress: {
        duration: number;
        playedSeconds: number;
    };
    road: React.RefObject<HTMLDivElement>;
    prog: React.RefObject<HTMLDivElement>;
    reseizer: React.RefObject<HTMLDivElement>
}