import VideoContainer from "@/features/VideoPlayer/VideoPlayer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <VideoContainer video="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" />
    </main>
  );
}
