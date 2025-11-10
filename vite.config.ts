import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createServer } from "./server";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // مهم لـ GitHub Pages: خليها اسم الريبو بالظبط
  base: "/zenith-oasis-webcam-enabled/",

  server: {
    host: process.env.HOST || "0.0.0.0",
    port: Number(process.env.PORT) || 8080,
    strictPort: false,
    open: true,
    fs: {
      allow: [
        path.resolve(__dirname, "./client"),
        path.resolve(__dirname, "./shared"),
        path.resolve(__dirname, "./node_modules"),
      ],
      deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
    },
  },

  build: {
    // انت محددها كده، فهاننشر من dist/spa
    outDir: "dist/spa",
    rollupOptions: {
      output: {
        manualChunks: {
          leaflet: ["leaflet", "react-leaflet"],
          charts: ["recharts"],
          motion: ["framer-motion"],
        },
      },
    },
  },

  plugins: [react(), expressPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
}));

function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve", // فقط أثناء التطوير
    configureServer(server) {
      const app = createServer();
      server.middlewares.use(app);
    },
  };
}
