import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// GitHub Pages project site: https://<user>.github.io/NubiaGo-Corporate-Identity/
const repoBase = '/NubiaGo-Corporate-Identity/';

export default defineConfig(({ mode }) => ({
  // Relative base also works for preview; absolute repo base is required for GH Pages assets + router.
  base: mode === 'production' ? repoBase : '/',
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
}));
