import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => ({
  // "/" for a custom domain or <user>.github.io; "/repo-name/" for a github.io/repo-name project site
  base: loadEnv(mode, ".", "VITE_").VITE_BASE_PATH || "/",
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          motion: ["framer-motion"],
        },
      },
    },
  },
}));
