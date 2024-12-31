import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';
import { query } from '$lib/server/db';

export const load: PageServerLoad = async ({ locals }) => {
  if (!locals.user) {
    throw redirect(302, '/login');
  }

  // 获取默认的7天收益趋势数据
  const chartData = await getEarningsChartData(locals.user?.id, '7d');

  return {
    user: locals.user,
    chartData
  };
};

async function getEarningsChartData(userId: string | undefined, range: string) {
  if (!userId) {
    return { labels: [], values: [] };
  }

  // 复用 /api/earnings/chart 的查询逻辑
  const timeFilter = 'DATE_SUB(NOW(), INTERVAL 7 DAY)';

  const userResult = await query<{node_ids: string}[]>(
    'SELECT node_ids FROM users WHERE id = ?', 
    [userId]
  );

  let nodeIds: string[] = [];
  try {
    nodeIds = JSON.parse(userResult[0]?.node_ids || '[]');
  } catch (_) {
    nodeIds = userResult[0]?.node_ids?.split(',').map((id: string) => id.trim()) || [];
  }

  if (!nodeIds.length) {
    return { labels: [], values: [] };
  }

  const idPlaceholders = nodeIds.map(() => '?').join(',');
  const minerResults = await query<{node: string}[]>(
    `SELECT node FROM fil_nodes WHERE id IN (${idPlaceholders})`,
    nodeIds
  );
  
  const minerIds = minerResults.map(r => r.node);
  const minerPlaceholders = minerIds.map(() => '?').join(',');

  const earnings = await query<{date: string, total: number}[]>(
    `SELECT 
      DATE(block_time) as date,
      SUM(CAST(reward_value AS DECIMAL(65,30))) as total
    FROM block 
    WHERE node IN (${minerPlaceholders})
      AND block_time >= ${timeFilter}
      AND status = 1
    GROUP BY DATE(block_time)
    ORDER BY date ASC`,
    minerIds
  );

  return {
    labels: earnings.map(e => e.date),
    values: earnings.map(e => Number(e.total))
  };
} 