import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), svgr()], // ✅ 중복 제거
  define: {
    global: "globalThis", // ✅ global 에러 방지
  },
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "",
        changeOrigin: true,
        secure: false,
      },
      "/ws": {
        target: "",
        changeOrigin: true,
        ws: true, // ✅ WebSocket proxy 옵션
        secure: false,
      },
    },
  },
});
