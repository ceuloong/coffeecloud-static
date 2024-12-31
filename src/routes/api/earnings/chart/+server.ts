import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { query } from '$lib/server/db';

export const GET: RequestHandler = async ({ url, locals }) => {
  if (!locals.user?.id) {
    return json({ labels: [], values: [] });
  }

  const range = url.searchParams.get('range') || '7d';
  
  // 根据range获取对应时间范围的SQL
  let timeFilter: string;
  switch (range) {
    case '24h':
      timeFilter = 'DATE_SUB(NOW(), INTERVAL 1 DAY)';
      break;
    case '30d':
      timeFilter = 'DATE_SUB(NOW(), INTERVAL 30 DAY)';
      break;
    case '90d':
      timeFilter = 'DATE_SUB(NOW(), INTERVAL 90 DAY)';
      break;
    case '7d':
    default:
      timeFilter = 'DATE_SUB(NOW(), INTERVAL 7 DAY)';
  }

  // 获取用户的节点列表
  const userResult = await query<{node_ids: string}[]>(
    'SELECT node_ids FROM users WHERE id = ?', 
    [locals.user.id]
  );

  let nodeIds: string[] = [];
  try {
    nodeIds = JSON.parse(userResult[0]?.node_ids || '[]');
  } catch (_) {
    nodeIds = userResult[0]?.node_ids?.split(',').map((id: string) => id.trim()) || [];
  }

  if (!nodeIds.length) {
    return json({ labels: [], values: [] });
  }

  // 获取节点的miner_id
  const idPlaceholders = nodeIds.map(() => '?').join(',');
  const minerResults = await query<{node: string}[]>(
    `SELECT node FROM fil_nodes WHERE id IN (${idPlaceholders})`,
    nodeIds
  );
  
  const minerIds = minerResults.map(r => r.node);
  const minerPlaceholders = minerIds.map(() => '?').join(',');

  // 查询每日收益数据
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

  const labels = earnings.map(e => e.date);
  const values = earnings.map(e => Number(e.total));

  return json({ labels, values });
}; 