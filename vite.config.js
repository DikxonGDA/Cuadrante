import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Obtén el nombre del repositorio del package.json
const repository = process.env.npm_package_name;

export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === 'production' ? `/${repository}/` : './',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
});