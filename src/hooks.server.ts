import type { Handle } from '@sveltejs/kit';
import {verifyToken } from '$lib/server/auth';
import { redirect } from '@sveltejs/kit';

// 启动时打印环境信息
console.log('=== Server Starting ===');
console.log('Environment:', process.env.NODE_ENV);
console.log('Port:', process.env.PORT || 3000);
console.log('=========*******============');

export const handle: Handle =async ({ event, resolve }) => {
  const token = event.cookies.get('session');

  if (token) {
    try {
      const user = verifyToken(token);
      event.locals.user = user;
    } catch (error) {
      console.error('Token verification failed:', error);
      event.cookies.delete('session', { path: '/' });
      if (event.url.pathname.startsWith('/dashboard')) {
        throw redirect(302, '/login');
      }
    }
  }

  const response = await resolve(event);
  return response;
};