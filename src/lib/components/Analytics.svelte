<script lang="ts">
  import { onMount } from 'svelte';
  import { language, t } from '$lib/stores/i18nStore';

  // 分开声明状态
  let rawData: any = null;
  let loading = true;
  let error = '';

  // 使用响应式声明计算最终的 analytics 数据
  $: analytics = rawData ? {
    totalPower: rawData.totalPower || 0,
    totalBalance: rawData.totalBalance || 0,
    totalAvailableBalance: rawData.totalAvailableBalance || 0,
    totalPledge: rawData.totalPledge || 0,
    totalVestingFunds: rawData.totalVestingFunds || 0,
    totalPledgeReleased: rawData.totalPledgeReleased || 0,
    totalRewards24h: rawData.totalRewards24h || 0,
    totalRewards7d: rawData.totalRewards7d || 0,
    totalRewards30d: rawData.totalRewards30d || 0,
    totalBlocks24h: rawData.totalBlocks24h || 0,
    totalSectors: rawData.totalSectors || 0,
    effectiveSectors: rawData.effectiveSectors || 0,
    errorSectors: rawData.errorSectors || 0,
    nodeCount: rawData.nodeCount || 0,
    nodeStatus: rawData.nodeStatus || {},
    nodeMetrics: rawData.nodeMetrics || [],
    powerUnit: rawData.powerUnit || 'PiB'
  } : {
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
    errorSectors: 0,
    nodeCount: 0,
    nodeStatus: {},
    nodeMetrics: [],
    powerUnit: 'PiB'
  };

  async function loadAnalytics() {
    try {
      const response = await fetch('/api/analytics');
      //console.log('Response status:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      //console.log('Received data:', data);

      // 更新原始数据
      rawData = data;
    } catch (e) {
      //console.error('Failed to load analytics:', e);
      error = e.message;
    } finally {
      loading = false;
    }
  }

  onMount(() => {
    loadAnalytics();
  });

  // 调试日志
  //$: console.log('Raw data:', rawData);
  //$: console.log('Computed analytics:', analytics);
  //$: console.log('Loading state:', loading);
</script>

<div class="analytics-container">
  {#if loading}
    <div class="loading">{t('common.loading', $language)}</div>
  {:else if error}
    <div class="error">{error}</div>
  {:else}
    <div class="stats-grid">
      <!-- 总算力 -->
      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-server"></i>
        </div>
        <div class="stat-content">
          <h3>{t('dashboard.analytics.totalPower', $language)}</h3>
          <div class="stat-value">
            {analytics.totalPower?.toFixed(2) || '0'}
            <span class="stat-unit">{analytics.powerUnit}</span>
          </div>
        </div>
      </div>

      <!-- 24h收益 -->
      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-coins"></i>
        </div>
        <div class="stat-content">
          <h3>{t('dashboard.analytics.rewards24h', $language)}</h3>
          <div class="stat-value">
            {analytics.totalRewards24h?.toFixed(4) || '0'}
            <span class="stat-unit">FIL</span>
          </div>
        </div>
      </div>

      <!-- 可用余额 -->
      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-wallet"></i>
        </div>
        <div class="stat-content">
          <h3>{t('dashboard.analytics.availableBalance', $language)}</h3>
          <div class="stat-value">
            {analytics.totalAvailableBalance?.toFixed(4) || '0'}
            <span class="stat-unit">FIL</span>
          </div>
        </div>
      </div>

      <!-- 总质押 -->
      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-lock"></i>
        </div>
        <div class="stat-content">
          <h3>{t('dashboard.analytics.totalPledge', $language)}</h3>
          <div class="stat-value">
            {analytics.totalPledge?.toFixed(4) || '0'}
            <span class="stat-unit">FIL</span>
          </div>
        </div>
      </div>
      <!-- 存储锁仓 -->
      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-lock"></i>
        </div>
        <div class="stat-content">
          <h3>{t('dashboard.analytics.totalVestingFunds', $language)}</h3>
          <div class="stat-value">
            {analytics.totalVestingFunds?.toFixed(4) || '0'}
            <span class="stat-unit">FIL</span>
          </div>
        </div>
      </div>
      <!-- 质押已释放 -->
      <div class="stat-card">
        <div class="stat-icon">
          <i class="fas fa-lock"></i>
        </div>
        <div class="stat-content">
          <h3>{t('dashboard.analytics.totalPledgeReleased', $language)}</h3>
          <div class="stat-value">
            {analytics.totalPledgeReleased?.toFixed(4) || '0'}
            <span class="stat-unit">FIL</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 节点状态表格 -->
    {#if analytics.nodeMetrics?.length > 0}
      <div class="metrics-container">
        <h3>{t('dashboard.analytics.nodeMetrics', $language)}</h3>
        <table>
          <thead>
            <tr>
              <th>{t('dashboard.analytics.minerID', $language)}</th>
              <th>{t('dashboard.analytics.power', $language)}</th>
              <th>{t('dashboard.analytics.efficiency', $language)}</th>
              <th>{t('dashboard.analytics.rewards24h', $language)}</th>
              <th>{t('dashboard.analytics.sectorHealth', $language)}</th>
              <th>{t('dashboard.analytics.status', $language)}</th>
            </tr>
          </thead>
          <tbody>
            {#each analytics.nodeMetrics as metric}
              <tr>
                <td>{metric.minerID}</td>
                <td>{metric.power?.toFixed(2) || '0'} {metric.powerUnit}</td>
                <td>{metric.efficiency?.toFixed(2) || '0'} FIL/PiB</td>
                <td>{metric.rewards24h?.toFixed(4) || '0'} FIL</td>
                <td>{metric.sectorHealth?.toFixed(2) || '0'}%</td>
                <td>
                  <span class="status-badge {metric.online ? 'online' : 'offline'}">
                    {t(`dashboard.analytics.${metric.online ? 'online' : 'offline'}`, $language)}
                  </span>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    {/if}

    <!-- 扇区统计 -->
    <div class="sectors-container">
      <h3>{t('dashboard.analytics.sectors', $language)}</h3>
      <div class="sectors-stats">
        <div class="sector-item">
          <span class="label">{t('dashboard.analytics.totalSectors', $language)}</span>
          <span class="value">{analytics.totalSectors || 0}</span>
        </div>
        <div class="sector-item">
          <span class="label">{t('dashboard.analytics.effectiveSectors', $language)}</span>
          <span class="value">{analytics.effectiveSectors || 0}</span>
        </div>
        <div class="sector-item">
          <span class="label">{t('dashboard.analytics.errorSectors', $language)}</span>
          <span class="value">{analytics.errorSectors || 0}</span>
        </div>
      </div>
    </div>
  {/if}
</div>

<style>

  .stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .stat-card {
    background: white;
    padding: 1.25rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .stat-icon {
    width: 42px;
    height: 42px;
    flex-shrink: 0;
    border-radius: 50%;
    background: var(--accent-color);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
  }

  .stat-content {
    flex: 1;
    min-width: 0;
  }

  .stat-content h3 {
    color: var(--text-light);
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
    white-space: nowrap;
  }

  .stat-value {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-color);
    display: flex;
    align-items: baseline;
    gap: 0.25rem;
    white-space: nowrap;
  }

  .stat-unit {
    font-size: 0.875rem;
    color: var(--text-light);
    font-weight: normal;
  }

  .chart-container {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .chart-container h3 {
    margin-bottom: 1rem;
    color: var(--text-color);
  }

  .chart-container div {
    width: 100%;
    height: 300px;
  }

  .metrics-container {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
  }

  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
  }

  th, td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid var(--border-color);
  }

  th {
    font-weight: 500;
    color: var(--text-light);
  }

  td {
    color: var(--text-color);
  }

  .status-badge {
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.875rem;
  }

  .status-badge.online {
    background: #48BB78;
    color: white;
  }

  .status-badge.offline {
    background: #F56565;
    color: white;
  }

  .sectors-container {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-top: 2rem;
  }

  .sectors-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
  }

  .sector-item {
    padding: 1rem;
    background: #F7FAFC;
    border-radius: 6px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .sector-item .label {
    color: var(--text-light);
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
  }

  .sector-item .value {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--text-color);
  }

  @media (max-width: 1400px) {
    .stats-grid {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @media (max-width: 1100px) {
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 768px) {
    .stats-grid {
      grid-template-columns: 1fr;
    }
  }
</style> 