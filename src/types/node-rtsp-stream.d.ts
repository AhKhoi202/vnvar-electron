declare module 'node-rtsp-stream' {
    interface StreamOptions {
      name: string;
      streamUrl: string;
      wsPort: number;
      ffmpegOptions?: {
        [key: string]: string | number;
      };
    }
  
    class Stream {
      constructor(options: StreamOptions);
      stop(): void;
    }
  
    export default Stream;
  }