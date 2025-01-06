import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ locals }) => {
  if (!locals.user) {
    return json({ message: 'Unauthorized' }, { status: 401 });
  }

  return json({ status: 'ok' });
}; 