import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Use VITE_BASE when publishing under a subpath (e.g. GitHub Pages).
// Default `/` works for Vercel, Netlify, and local preview.
const base = process.env.VITE_BASE || '/';

export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 1200
  }
});
