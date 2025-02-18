import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    outDir: "dist",
  },
  server: {
    port: 5123,
    strictPort: true,
    proxy: {
      "/stream.m3u8": "http://localhost:5123",
      "/ws": {
        target: "ws://localhost:9999",
        ws: true,
      },
    },
  },
});
