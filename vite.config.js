import { resolve } from 'path';
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        login: resolve(__dirname, 'src/views/login.html'),
        registro: resolve(__dirname, 'src/views/registro.html'),
        adminDashboard: resolve(__dirname, 'src/views/adminDashboard.html'),
        misreparaciones: resolve(__dirname, 'src/views/misreparaciones.html'),
      },
    },
  },
});