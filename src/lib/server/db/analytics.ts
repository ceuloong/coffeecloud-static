import { query } from '../db';
import type { RowDataPacket } from 'mysql2';

interface FilNode extends RowDataPacket {
  id: number;
  node: string;
  available_balance: string | number;
  balance: string | number;
  sector_pledge_balance: string | number;
  last_dis_sector_pledge_balance: string | number;
  quality_adj_power: string | number;
  power_unit: string;
  sector_total: string | number;
  sector_effective: string | number;
  sector_error: string | number;
  blocks_mined24h: string | number;
  total_rewards24h: string | number;
  total_rewards7d: string | number;
  total_rewards30d: string | number;
  mining_efficiency: string | number;
  sync_status: string;
  on_line: number;
}

export async function getUserAnalytics(userId: string) {
  // 首先获取用户的 node_ids
  const userQuery = await query<any[]>('SELECT node_ids FROM users WHERE id = ?', [userId]);
  
  let nodeIds: number[] = [];
  try {
    // 尝试解析 JSON 格式
    nodeIds = JSON.parse(userQuery[0]?.node_ids || '[]');
  } catch (e) {
    // 如果不是 JSON，尝试解析逗号分隔的字符串
    nodeIds = userQuery[0]?.node_ids?.split(',').map((id: string) => parseInt(id.trim())) || [];
  }

  if (!nodeIds.length) {
    console.log('No node IDs found for user:', userId);
    return defaultAnalytics();
  }

  // 构建 IN 查询的占位符
  const placeholders = nodeIds.map(() => '?').join(',');
  
  // 使用 IN 查询获取节点数据
  const nodes = await query<FilNode[]>(
    `SELECT * FROM fil_nodes WHERE id IN (${placeholders})`,
    nodeIds
  );
  //console.log(`Found ${nodes.length} nodes for IDs:`, nodeIds);

  if (!nodes.length) {
    return defaultAnalytics();
  }

  // 计算汇总数据
  const analytics = nodes.reduce((acc, node) => ({
    totalPower: acc.totalPower + Number(node.quality_adj_power || 0),
    totalBalance: acc.totalBalance + Number(node.balance || 0),
    totalAvailableBalance: acc.totalAvailableBalance + Number(node.available_balance || 0),
    totalPledge: acc.totalPledge + Number(node.sector_pledge_balance || 0),
    totalVestingFunds: acc.totalVestingFunds + Number(node.vesting_funds || 0),
    totalPledgeReleased: acc.totalPledgeReleased + (Number(node.last_dis_sector_pledge_balance || 0) - Number(node.sector_pledge_balance || 0)),
    totalRewards24h: acc.totalRewards24h + Number(node.total_rewards24h || 0),
    totalRewards7d: acc.totalRewards7d + Number(node.total_rewards7d || 0),
    totalRewards30d: acc.totalRewards30d + Number(node.total_rewards30d || 0),
    totalBlocks24h: acc.totalBlocks24h + Number(node.blocks_mined24h || 0),
    totalSectors: acc.totalSectors + Number(node.sector_total || 0),
    effectiveSectors: acc.effectiveSectors + Number(node.sector_effective || 0),
    errorSectors: acc.errorSectors + Number(node.sector_error || 0),
  }), defaultAnalytics());

  return {
    ...analytics,
    nodeCount: nodes.length,
    nodeStatus: getNodeStatus(nodes),
    nodeMetrics: getNodeMetrics(nodes),
    powerUnit: nodes[0]?.power_unit || 'PiB',
  };
}

function getNodeStatus(nodes: FilNode[]) {
  return nodes.reduce((acc, node) => {
    const status = node.on_line ? 'online' : 'offline';
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
}

function getNodeMetrics(nodes: FilNode[]) {
  return nodes.map(node => ({
    minerID: node.node,
    power: Number(node.quality_adj_power || 0),
    powerUnit: node.power_unit,
    efficiency: Number(node.mining_efficiency || 0),
    syncStatus: node.sync_status,
    online: Boolean(node.on_line),
    balance: Number(node.balance || 0),
    availableBalance: Number(node.available_balance || 0),
    rewards24h: Number(node.total_rewards24h || 0),
    sectorHealth: node.sector_effective ? 
      ((Number(node.sector_effective) - Number(node.sector_error || 0)) / Number(node.sector_effective) * 100) : 0
  }));
}

function defaultAnalytics() {
  return {
    totalPower: 0,
    totalBalance: 0,
    totalAvailableBalance: 0,
    totalPledge: 0,
    totalVestingFunds: 0,
    totalPledgeReleased: 0,
    totalRewards24h: 0,
    totalRewards7d: 0,
    totalRewards30d: 0,
    totalBlocks24h: 0,
    totalSectors: 0,
    effectiveSectors: 0,
    errorSectors: 0
  };
} 