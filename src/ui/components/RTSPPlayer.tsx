import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css";

const RTSPPlayer: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;
    console.log("RTSPPlayer");
    const player = videojs(videoRef.current, {
      controls: true,
      autoplay: true,
      responsive: true,
      fluid: true,
      sources: [
        {
          src: "file://" + window.electron.getHLSPath(), // Get the HLS file dynamically
          type: "application/x-mpegURL",
        },
      ],
    });

    return () => {
      player.dispose();
    };
  }, []);

  return <video ref={videoRef} className="video-js vjs-default-skin" />;
};

export default RTSPPlayer;
