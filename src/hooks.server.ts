import { sequence } from '@sveltejs/kit/hooks';
import type { Handle } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private';
import { initializeDatabase } from '$lib/server/dbInit';

// 初始化数据库
initializeDatabase().catch(console.error);

const authorization: Handle = async ({ event, resolve }) => {
  const token = event.cookies.get('session');

  if (token) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as {
        id: number;
        email: string;
        iat: number;
        exp: number;
      };
      event.locals.user = decoded;
    } catch (err) {
      event.cookies.delete('session', { path: '/' });
    }
  }

  return resolve(event);
};

export const handle = sequence(authorization); 