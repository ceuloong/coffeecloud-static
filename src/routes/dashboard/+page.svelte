<script lang="ts">
  import { language, t } from '$lib/stores/i18nStore';
  import EarningsChart from '$lib/components/EarningsChart.svelte';
  import Analytics from '$lib/components/Analytics.svelte';
  export let data;
  const user = data?.user || { username: '', email: '' };
  const verifyStatus = data?.verifyStatus?.status || 'none';

  // 添加状态样式映射
  const statusClassMap = {
    pending: 'status-pending',
    verified: 'status-active',
    rejected: 'status-rejected',
    none: 'status-pending'
  };

  // 示例数据，实际应该从API获取
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    values: [10.5, 12.3, 9.8, 11.2, 10.9, 11.8, 12.1]
  };
</script>

<div class="dashboard-container">
  <!-- 现有的仪表盘内容 -->
  <Analytics />
  <!-- 添加收益趋势图表 -->
  <div class="earnings-trend">
    <EarningsChart data={chartData} />
  </div>
</div>

<style>
  .dashboard-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding: 1.5rem;
  }
</style> 