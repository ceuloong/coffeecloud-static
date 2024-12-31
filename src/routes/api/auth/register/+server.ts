import { json } from '@sveltejs/kit';
import { createUser } from '$lib/server/userService';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
  try {
    const { username, email, password } = await request.json();
    await createUser(username, email, password);
    return json({ message: '注册成功' });
  } catch (error: any) {
    return json({ message: error.message }, { status: 400 });
  }
}; 