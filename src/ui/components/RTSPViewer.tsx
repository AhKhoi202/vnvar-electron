import React, { useEffect, useRef } from "react";
import JSMpeg from "@cycjimmy/jsmpeg-player";

interface RTSPViewerProps {
  rtspUrl: string;
}

const RTSPViewer: React.FC<RTSPViewerProps> = ({ rtspUrl }) => {
  const videoRef = useRef<HTMLDivElement>(null);
  const player = useRef<any>(null);

  useEffect(() => {
    const startStream = async () => {
      try {
        // Start the stream in the main process
        window.electronAPI.startStream(rtspUrl);

        // Listen for stream start confirmation
        const handleStreamStarted = (
          _event: any,
          data: { port: number; success: boolean }
        ) => {
          if (data.success && videoRef.current) {
            // Create new player instance
            player.current = new JSMpeg.Player(`ws://localhost:${data.port}`, {
              canvas: videoRef.current,
              autoplay: true,
              audio: false,
              loop: true,
            });
          }
        };

        // Listen for stream errors
        const handleStreamError = (_event: any, data: { error: string }) => {
          console.error("Stream error:", data.error);
          // Handle error appropriately (show error message to user, etc.)
        };

        // Add event listeners
        window.electron.on("stream-started", handleStreamStarted);
        window.electron.on("stream-error", handleStreamError);

        return () => {
          // Cleanup
          window.electron.removeListener("stream-started", handleStreamStarted);
          window.electron.removeListener("stream-error", handleStreamError);
          if (player.current) {
            player.current.destroy();
          }
          window.electronAPI.stopStream();
        };
      } catch (error) {
        console.error("Failed to start stream:", error);
      }
    };

    startStream();
  }, [rtspUrl]);

  return (
    <div className="rtsp-viewer">
      <div ref={videoRef} className="video-canvas" />
    </div>
  );
};

export default RTSPViewer;
