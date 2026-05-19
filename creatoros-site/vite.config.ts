import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: true,
    headers: {
      'X-Frame-Options': 'ALLOWALL',
      'Content-Security-Policy': "frame-ancestors *",
    },
    // Dev proxy: forward `/platform/*` to the root platform app (Vite on port 3000).
    // Owner "Open Module" links go through this proxy. In production, set
    // VITE_PLATFORM_URL to the deployed platform URL instead.
    proxy: {
      '/platform': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        ws: true,
      },
    },
  },
});
