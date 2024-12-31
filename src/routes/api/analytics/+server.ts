import { json } from '@sveltejs/kit';
import { getUserAnalytics } from '$lib/server/db/analytics';

export async function GET({ locals }) {
  try {
    if (!locals.user?.id) {
      return new Response('Unauthorized', { status: 401 });
    }

    const analytics = await getUserAnalytics(locals.user.id);
    //console.log('API Response:', analytics); // 调试日志
    
    return json(analytics);
  } catch (error) {
    console.error('Analytics API error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
} 