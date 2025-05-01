import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import jsconfigPaths from "vite-jsconfig-paths"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), jsconfigPaths()],
  server: {
    host: '0.0.0.0',
    proxy: {
      '/auth': 'http://127.0.0.1:5000', // Use IPv4 loopback
      '/db': 'http://127.0.0.1:5000',
      '/s3': 'http://127.0.0.1:5000',
      
    },
  },
  });
  
