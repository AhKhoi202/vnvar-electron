export interface ElectronAPI {
  setRtspUrl: (rtspUrl: string) => Promise<void>;
  startStream: (url: string) => void;
  stopStream: () => Promise<void>;

  readContent: () => Promise<{ left: string; score1: string; score2: string; title: string; right: string }>;
  saveScreenshot: (url: string) => void;

}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }
}
