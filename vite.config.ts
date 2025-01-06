import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    proxy: {
      '/upload-api': {
        target: isProduction 
          ? 'https://192.168.103.112:8005'
          : 'http://localhost:8005',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/upload-api/, '/api'),
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq, req) => {
            proxyReq.setHeader('Cookie', req.headers.cookie || '');
          });
        }
      }
    }
  }
});