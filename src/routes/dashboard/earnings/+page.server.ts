import type { PageServerLoad } from './$types';
import { query } from '$lib/server/db';

interface UserResult {
  node_ids: string;
}

export const load: PageServerLoad = async ({ locals, url }) => {
  if (!locals.user?.id) {
    return getEmptyResponse();
  }

  // 获取分页参数
  const page = Number(url.searchParams.get('page')) || 1;
  const pageSize = 10;
  const offset = (page - 1) * pageSize;

  // 获取用户的节点列表
  const userResult = await query<UserResult[]>('SELECT node_ids FROM users WHERE id = ?', [locals.user.id]);
  
  // 如果查询结果为空或 node_ids 为空，直接返回空结果
  if (!userResult.length || !userResult[0].node_ids) {
    return getEmptyResponse();
  }

  let nodeIds: string[] = [];
  const rawNodeIds = userResult[0].node_ids;

  try {
    // 尝试解析 JSON
    nodeIds = JSON.parse(rawNodeIds);
  } catch {
    // JSON 解析失败，尝试作为逗号分隔的字符串处理
    nodeIds = rawNodeIds.split(',').map(id => id.trim()).filter(Boolean);
  }

  if (!nodeIds.length) {
    return getEmptyResponse();
  }

  // 获取节点的miner_id
  const idPlaceholders = nodeIds.map(() => '?').join(',');
  const minerResults = await query<{node: string}[]>(
    `SELECT node FROM fil_nodes WHERE id IN (${idPlaceholders})`,
    nodeIds
  );
  
  const minerIds = minerResults.map(r => r.node);
  const minerPlaceholders = minerIds.map(() => '?').join(',');

  // 获取总记录数
  const [totalResult] = await query<[{total: number}]>(
    `SELECT COUNT(*) as total 
    FROM block 
    WHERE node IN (${minerPlaceholders})`,
    minerIds
  );
  const total = Number(totalResult.total);
  const totalPages = Math.ceil(total / pageSize);

  // 查询分页数据 - 修复参数类型
  const earnings = await query(
    `SELECT 
      height,
      node,
      block_time,
      CAST(reward_value AS CHAR) as reward_value,
      msg_count,
      block_size,
      status
    FROM block 
    WHERE node IN (${minerPlaceholders})
    ORDER BY block_time DESC
    LIMIT ${pageSize} OFFSET ${offset}`,
    minerIds  // 只传入 minerIds 参数
  );

  return {
    earnings,
    pagination: {
      total,
      currentPage: page,
      pageSize,
      totalPages
    }
  };
};

// 抽取空响应为函数
function getEmptyResponse() {
  return {
    earnings: [],
    pagination: {
      total: 0,
      currentPage: 1,
      pageSize: 10,
      totalPages: 0
    }
  };
} 