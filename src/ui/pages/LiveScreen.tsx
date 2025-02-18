import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import videojs from "video.js";

const LiveScreen = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const rtspUrl = params.get("rtsp");  // Lấy URL RTSP từ query params
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            const player = videojs(videoRef.current, {
                techOrder: ["vlc"],
                autoplay: true,
                controls: true,
                sources: [{ src: rtspUrl, type: "application/x-rtsp" }],
            });

            return () => {
                if (player) {
                    player.dispose();
                }
            };
        }
    }, [rtspUrl]);

    return (
      <div style={{ textAlign: "center", marginTop: "5%" }}>
      <h1>Live Screen</h1>
      <video ref={videoRef} className="video-js vjs-default-skin" width="80%" />
  </div>
    );
};

export default LiveScreen;
