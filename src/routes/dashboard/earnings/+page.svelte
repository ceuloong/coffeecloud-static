<script lang="ts">
  import { language, t } from '$lib/stores/i18nStore';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  import { invalidateAll } from '$app/navigation';
  
  interface Earning {
    height: number;
    node: string;
    block_time: string;
    reward_value: string;
    msg_count: number;
    status: number;
  }

  interface PageData {
    earnings: Earning[];
    pagination: {
      total: number;
      currentPage: number;
      pageSize: number;
      totalPages: number;
    };
  }

  export let data: PageData;
  const { earnings, pagination } = data;

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }

  function formatReward(value: string): string {
    const num = Number(value);
    return isNaN(num) ? '0.0000' : num.toFixed(4);
  }

  async function changePage(pageNum: number) {
    if (pageNum < 1 || pageNum > pagination.totalPages) return;
    //await goto(`?page=${pageNum}`, { invalidateAll: true });
    window.location.href = `/dashboard/earnings?page=${pageNum}`;
  }

  // 生成分页按钮数组
  function getPaginationArray() {
    const { currentPage, totalPages } = pagination;
    const delta = 2;
    const range: number[] = [];
    const rangeWithDots: (number | string)[] = [];
    let l: number;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || 
          (i >= currentPage - delta && i <= currentPage + delta)) {
        range.push(i);
      }
    }

    range.forEach(i => {
      if (l) {
        if (i - l === 2) {
          rangeWithDots.push(l + 1);
        } else if (i - l !== 1) {
          rangeWithDots.push('...');
        }
      }
      rangeWithDots.push(i);
      l = i;
    });

    return rangeWithDots;
  }
</script>

<svelte:head>
  <title>{t('dashboard.earnings.title', $language)} - {$page.url.searchParams.get('page') || 1}</title>
</svelte:head>

<div class="earnings-container">
  <div class="card-header">
    <h2>{t('dashboard.earnings.title', $language)}</h2>
  </div>

  <div class="card-content">
    <div class="earnings-table">
      {#if earnings.length === 0}
        <div class="no-data">
          <i class="fas fa-inbox"></i>
          {t('dashboard.earnings.noData', $language)}
        </div>
      {:else}
      <table>
        <thead>
          <tr>
            <th>{t('dashboard.earnings.blockHeight', $language)}</th>
            <th>{t('dashboard.earnings.minerID', $language)}</th>
            <th>{t('dashboard.earnings.blockTime', $language)}</th>
            <th>{t('dashboard.earnings.reward', $language)}</th>
            <th>{t('dashboard.earnings.messageCount', $language)}</th>
            <th>{t('dashboard.earnings.status', $language)}</th>
          </tr>
        </thead>
        <tbody>
          {#each earnings as earning}
            <tr>
              <td>{earning.height}</td>
              <td>{earning.node}</td>
              <td>{formatDate(earning.block_time)}</td>
              <td class="reward">{formatReward(earning.reward_value)} FIL</td>
              <td>{earning.msg_count}</td>
              <td>
                <span class="status-badge {earning.status === 1 ? 'normal' : 'orphan'}">
                  {earning.status === 1 ? 
                    t('dashboard.earnings.statusNormal', $language) : 
                    t('dashboard.earnings.statusOrphan', $language)
                  }
                </span>
              </td>
            </tr>
          {/each}
        </tbody>
      </table>
      {/if}
    </div>
  </div>

  {#if pagination.total > 0}
    <div class="pagination">
      <button 
        class="page-btn" 
        disabled={pagination.currentPage === 1}
        on:click={() => changePage(pagination.currentPage - 1)}
      >
        上一页
      </button>

      {#each getPaginationArray() as page}
        {#if page === '...'}
          <span class="page-dots">...</span>
        {:else}
          <button 
            class="page-btn" 
            class:active={page === pagination.currentPage}
            on:click={() => changePage(page)}
          >
            {page}
          </button>
        {/if}
      {/each}

      <button 
        class="page-btn" 
        disabled={pagination.currentPage === pagination.totalPages}
        on:click={() => changePage(pagination.currentPage + 1)}
      >
        下一页
      </button>
    </div>
  {/if}
</div>

<style>
  .earnings-container {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    background: white;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .card-header {
    padding: 1.25rem 1.5rem;
    border-bottom: 1px solid var(--border-color);
    background: #f8fafc;
  }

  .card-header h2 {
    color: var(--text-color);
    font-size: 1.125rem;
    font-weight: 600;
    margin: 0;
  }

  .card-content {
    padding: 1.5rem;
    overflow-x: auto;
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  th, td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid var(--border-color);
    white-space: nowrap;
  }

  th {
    background: #f8fafc;
    font-weight: 500;
    color: var(--text-light);
  }

  td {
    color: var(--text-color);
  }

  .reward {
    font-weight: 500;
    color: var(--success-color, #48BB78);
  }

  .status-badge {
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.875rem;
  }

  .status-badge.normal {
    background: #D1FAE5;
    color: #059669;
  }

  .status-badge.orphan {
    background: #FEE2E2;
    color: #DC2626;
  }

  .no-data {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 3rem;
    color: var(--text-light);
    font-size: 0.875rem;
    background: #f8fafc;
    border-radius: 6px;
    gap: 0.5rem;
  }

  .no-data i {
    font-size: 2rem;
    color: var(--border-color);
  }

  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1.5rem;
    padding: 1rem;
  }

  .page-btn {
    padding: 0.375rem 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    background: white;
    color: var(--text-color);
    cursor: pointer;
    font-size: 0.875rem;
    transition: all 0.2s;
  }

  .page-btn:hover:not(:disabled) {
    background: #f8fafc;
  }

  .page-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .page-btn.active {
    background: #059669;
    color: white;
    border-color: #059669;
  }

  .page-dots {
    color: var(--text-light);
    padding: 0 0.25rem;
  }

  @media (max-width: 640px) {
    .card-header {
      padding: 1rem;
    }

    .card-content {
      padding: 1rem;
    }

    .pagination {
      flex-wrap: wrap;
    }
  }
</style> 