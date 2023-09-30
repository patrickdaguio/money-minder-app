/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/js/setupTests.ts",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@js": path.resolve(__dirname, "src/js"),
      "@css": path.resolve(__dirname, "src/css"),
      "@assets": path.resolve(__dirname, "src/assets"),
    },
  },
});
