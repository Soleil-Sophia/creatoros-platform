import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ command }) => ({
  // In dev (`vite`), served behind the creatoros-site `/platform` dev proxy, so
  // all asset URLs must resolve under `/platform/`. In a standalone production
  // build (`vite build`), the platform app is deployed as its own static app at
  // the domain root, so assets resolve under `/`. React Router's basename stays
  // `/platform` in both cases (see src/app/routes.ts) — only the asset prefix
  // differs between dev and build.
  base: command === 'build' ? '/' : '/platform/',

  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],

  server: {
    port: 3000,
    host: '0.0.0.0',
    allowedHosts: true,
    hmr: {
      // Replit proxies WebSocket over WSS on port 443 — use the public dev domain
      protocol: 'wss',
      host: process.env.REPLIT_DEV_DOMAIN,
      clientPort: 443,
    },
    watch: {
      // Exclude Replit internal state directories to prevent constant HMR reload loops
      ignored: ['**/.local/**', '**/node_modules/**'],
    },
  },
}))
