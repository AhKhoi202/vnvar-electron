const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  setRtspUrl: (rtspUrl: string) => ipcRenderer.send("set-rtsp-url", rtspUrl),
  startStream: (url: string) => ipcRenderer.send("start-stream", url),
  stopStream: () => ipcRenderer.invoke("stop-stream"),
});
