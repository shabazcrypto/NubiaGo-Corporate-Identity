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
  server: {
    // Transform the default route graph early so the first browser hit is warmer.
    warmup: {
      clientFiles: [
        './src/index.tsx',
        './src/App.tsx',
        './src/components/layout/AppShell.tsx',
        './src/pages/BrandSystem.tsx'
      ]
    }
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-dom/client',
      'react-router-dom',
      'lucide-react',
      'clsx',
      'tailwind-merge',
      'class-variance-authority',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-label',
      '@radix-ui/react-separator',
      '@radix-ui/react-slot',
      '@radix-ui/react-tabs'
    ]
  },
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 1200
  }
});
