import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    proxy: {
      '/upload-api': {
        target: 'http://localhost:8005',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/upload-api/, '/api')
      }
    }
  }
});