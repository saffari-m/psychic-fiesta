import React, { Suspense } from "react";
import ErrorBoundary from "./components/error-boundry";
const VideoPlayer = React.lazy(() => import("./components/player"));
import { getVideoJsConfig } from "../mock";

const VideoPlayerOptions = getVideoJsConfig({ imortal: 1 });
console.log("VideoPlayerOptions are : ", VideoPlayerOptions);

export default function App() {
  const playerRef = React.useRef(null);

  const handlePlayerReady = ({ videojs }) => {
    playerRef.current = videojs;

    // configSubtitile(videojs);

    // you can handle player events here
    videojs.on("waiting", () => {
      console.log("player is waiting");
    });

    videojs.on("dispose", () => {
      console.log("player will dispose");
    });
  };
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <VideoPlayer options={VideoPlayerOptions} onReady={handlePlayerReady} />
      </Suspense>
    </ErrorBoundary>
  );
}
