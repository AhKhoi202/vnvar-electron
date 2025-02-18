export interface ElectronAPI {
  setRtspUrl: (rtspUrl: string) => Promise<void>;
  startStream: (url: string) => void;
  stopStream: () => Promise<void>;
}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
