import React, { useEffect } from "react";

import VJSPlayer from "@filmgardi/phoenix-video-player";

const DEFAULT_OPTIONS = {
  autoplay: false,
  controls: true,
  playbackRates: [0.5, 1, 1.25, 1.5, 3],
  autofocus: true,
  muted: false,
  html5: {
    nativeTextTracks: !1,
    hlsjsConfig: {
      // Put your hls.js config here
    },
  },
  preload: "meta",
  aspectratio: null,
  touchnativecontrols: false,
  share: false,
  liveSeekButtons: {
    back: 10,
  },
};

const VideoPlayer = (props) => {
  const { options, onReady } = props || {};

  useEffect(() => {
    const playerOptions = Object.assign({}, DEFAULT_OPTIONS, options);

    const player = new VJSPlayer("my-player", playerOptions, (player) => {
      onReady && onReady(player);
    });

    return () => {
      if (player) {
        player.dispose();
      }
    };
  });

  return (
    <div
      style={{ width: "100%", height: "100vh" }}
      className={["wrapper"].join(" ")}
    >
      <div data-vjs-player>
        <video
          id="my-player"
          className={[
            "video-js",
            "vjs-big-play-centered ",
            "fullscreen ",
            "fullScreen-fixed",
            "vjs-fill",
          ].join(" ")}
        />
      </div>
    </div>
  );
};

VideoPlayer.defaultProps = {
  className: "",
  autoplay: false,
  controls: true,
  playbackRates: [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2],
  poster: "",
  sources: [],
  videoProgress: () => null,
};

export default VideoPlayer;
