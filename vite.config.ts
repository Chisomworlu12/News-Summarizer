import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/guardian-proxy": {
        target: "https://content.guardianapis.com",
        changeOrigin: true,

        rewrite: (path) => path.replace(/^\/guardian-proxy/, ""),
      },
    },
  },
  build: {
    chunkSizeWarningLimit: 1500,
  },
});
