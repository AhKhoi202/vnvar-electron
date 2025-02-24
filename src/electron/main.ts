import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { isDev } from "./utils.js";
import { getPreloadPath } from "./pathResolver.js";
import { exec } from "child_process";
import fs from "fs";

import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let currentRtspUrl: string = ""; // Lưu RTSP URL hiện tại
let mainWindow: BrowserWindow | null = null;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 768,
    webPreferences: {
      preload: getPreloadPath(),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  if (isDev()) {
    mainWindow.loadURL("http://localhost:5123");
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist/index.html"));
  }
});

// 🛠 Xử lý sự kiện khi tất cả cửa sổ bị đóng
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

console.log('currentRtspUrl',currentRtspUrl)
ipcMain.on("set-rtsp-url", (event, url) => {
  console.log("Nhan RTSP URL tu UI:", url);
  currentRtspUrl = url; // Lưu RTSP URL để sử dụng sau này

  // ✅ Chạy FFmpeg để chuyển RTSP -> RTMP
  // const command = `ffmpeg -rtsp_transport tcp -i "${url}" -c:v copy -c:a aac -ar 44100 -f flv rtmp://localhost/live/stream`;
  const command = `ffmpeg -re -i "${url}" -c:v libx264 -preset fast -b:v 3000k -maxrate 3500k -bufsize 6000k -c:a aac -b:a 160k -f flv "rtmp://a.rtmp.youtube.com/live2/fs01-kcwt-rfsy-t576-7xy3"`;



  console.log('currentRtspUrl',currentRtspUrl)

  console.log("RUN FFmpeg:", command);
  // Chạy FFmpeg và hiển thị log ra terminal
  const ffmpegProcess = exec(command);
  // Lắng nghe dữ liệu stdout và hiển thị log trên terminal
  ffmpegProcess.stdout?.on("data", (data) => {
    console.log("FFmpeg stdout: ", data.toString());
  });
  // Lắng nghe lỗi stderr và hiển thị lỗi trên terminal
  ffmpegProcess.stderr?.on("data", (data) => {
    console.error("FFmpeg stderr: ", data.toString());
  });
  // Lắng nghe khi quá trình FFmpeg hoàn tất
  ffmpegProcess.on("close", (code) => {
    console.log(`FFmpeg process exited with code ${code}`);
  });
  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Err FFmpeg: ${error.message}`);
      return;
    }
    console.log(`FFmpeg output: ${stdout}`);
    console.error(`FFmpeg stderr: ${stderr}`);
  });

});



ipcMain.handle("read-content", async () => {
  const filePath = "./src/ui/assets/content.json";

  try {
    if (!fs.existsSync(filePath)) {
      console.warn("File content.json không tồn tại, tạo file mới...");
      fs.writeFileSync(filePath, JSON.stringify({
        left: "player1",
        score1: "0",
        score2: "0",
        title: "RACE TO 1",
        right: "player2"
      }, null, 2));
    }

    const rawData = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(rawData);
  } catch (error) {
    console.error("Lỗi đọc content.json:", error);
    return null;
  }
});


ipcMain.on("save-screenshot", async (event, dataUrl) => {
  try {
    const base64Data = dataUrl.replace(/^data:image\/png;base64,/, "");
    const assetsPath = path.join(__dirname, "../src/ui/assets/screenshot.png"); // Lưu vào assets
    fs.writeFileSync(assetsPath, base64Data, "base64");
    console.log("Screenshot saved to:", assetsPath);
  } catch (error) {
    console.error("Failed to save screenshot:", error);
  }
});
