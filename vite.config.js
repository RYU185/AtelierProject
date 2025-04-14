// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  define: {
    global: "window",
  },
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
    },
  },
  server: {
    port: 5173, // 프론트 개발 포트
    proxy: {
      "/api": {
        target: "http://localhost:8081", // 백엔드 포트
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
