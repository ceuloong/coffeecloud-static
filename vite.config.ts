import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [sveltekit()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    proxy: {
      '/upload-api': {
        target: 'http://localhost:8005',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/upload-api/, '/api'),
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq, req) => {
            console.log('Proxying request to:', proxyReq.path);
            proxyReq.setHeader('Cookie', req.headers.cookie || '');
          });
          proxy.on('error', (err, req, res) => {
            console.error('Proxy error:', err);
            res.writeHead(500, {
              'Content-Type': 'text/plain'
            });
            res.end('Proxy error: ' + err.message);
          });
          proxy.on('proxyRes', (proxyRes) => {
            console.log('Proxy response status:', proxyRes.statusCode);
            console.log('Proxy response headers:', proxyRes.headers);
          });
        }
      }
    }
  }
});