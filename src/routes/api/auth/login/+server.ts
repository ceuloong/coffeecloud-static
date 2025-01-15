import { json } from '@sveltejs/kit';
import { validateUser } from '$lib/server/userService';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request, cookies }) => {
  try {
    const { email, password } = await request.json();
    const { user, token } = await validateUser(email, password);

    // 设置 cookie
    cookies.set('session', token, {
      path: '/',
      httpOnly: true,
      sameSite: 'strict',
      // 如果是生产环境或者使用 HTTPS
      secure: process.env.NODE_ENV === 'production' || request.url.startsWith('https'),
      maxAge: 60 * 60 * 24 * 7, // 7 days
      // 只在使用 HTTPS 时设置 domain
      domain: request.url.startsWith('https') ? process.env.DOMAIN || 'localhost' : undefined
    });
    console.log(process.env.NODE_ENV, request.url);

    return json({
      user,
      message: '登录成功'
    });
  } catch (error: unknown) {
    console.error('Login error:', error);
    return json({ message: error instanceof Error ? error.message : '登录失败' }, { status: 400 });
  }
}; 