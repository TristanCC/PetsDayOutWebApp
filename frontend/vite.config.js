import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import jsconfigPaths from "vite-jsconfig-paths"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), jsconfigPaths()],
  server: {
    proxy: {
      '/auth': 'http://localhost:5000', // Proxy requests to /auth to the backend
      '/db': 'http://localhost:5000'
    },
  },
});
