import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/auth': 'http://localhost:5000', // Proxy requests to /auth to the backend
      '/db': 'http://localhost:5000'
    },
  },
});
