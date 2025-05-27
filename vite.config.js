// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5174,
  },
  build: {
    outDir: 'dist', // must match backend static folder
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // optional but helpful for clean imports
    },
  },
});
