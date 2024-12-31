<script lang="ts">
  import { language, t } from '$lib/stores/i18nStore';
  
  export let data;
  const user = data?.user || { username: '', email: '' };
  const verifyStatus = data?.verifyStatus?.status || 'none';

  type StatusType = 'pending' | 'verified' | 'rejected' | 'none';
  const statusClassMap: Record<StatusType, string> = {
    pending: 'status-pending',
    verified: 'status-active',
    rejected: 'status-rejected',
    none: 'status-pending'
  };

  function formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  }
</script>

<div class="account-container">
  <div class="card-header">
    <h2>{t('dashboard.account.title', $language)}</h2>
  </div>

  <div class="card-content">
    <div class="info-list">
      <div class="info-item">
        <span class="label">{t('auth.username', $language)}:</span>
        <span class="value">{user.username}</span>
      </div>
      <div class="info-item">
        <span class="label">{t('auth.email', $language)}:</span>
        <span class="value">{user.email}</span>
      </div>
      <div class="info-item">
        <span class="label">{t('dashboard.account.verifyStatus', $language)}:</span>
        <span class="value {statusClassMap[verifyStatus as StatusType]}">
          {t(`dashboard.verify.status.${verifyStatus || 'none'}`, $language)}
          {#if verifyStatus === 'rejected' && data.verifyStatus.rejectReason}
            <div class="reject-reason">
              {t('dashboard.verify.rejectReason', $language)}: {data.verifyStatus.rejectReason}
            </div>
          {/if}
        </span>
      </div>
      <div class="info-item">
        <span class="label">{t('dashboard.account.registerTime', $language)}:</span>
        <span class="value">{formatDate(data.user.createdAt)}</span>
      </div>
    </div>
  </div>
</div>

<style>
  .account-container {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    background: white;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    overflow: hidden;
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
  }

  .info-list {
    width: 100%;
  }

  .info-item {
    display: flex;
    align-items: center;
    padding: 0.75rem 0;
    border-bottom: 1px solid var(--border-color);
  }

  .info-item:last-child {
    border-bottom: none;
  }

  .info-item .label {
    color: var(--text-light);
    min-width: 140px;
    padding-right: 1rem;
  }

  .info-item .value {
    color: var(--text-color);
    flex: 1;
  }

  .status-active {
    color: var(--success-color, #48BB78);
  }

  .status-pending {
    color: var(--warning-color, #ECC94B);
  }

  .status-rejected {
    color: var(--danger-color, #F56565);
  }

  .reject-reason {
    font-size: 0.875rem;
    color: var(--danger-color, #F56565);
    margin-top: 0.25rem;
  }

  @media (max-width: 640px) {
    .card-header {
      padding: 1rem;
    }

    .card-content {
      padding: 1rem;
    }

    .info-item {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.25rem;
    }

    .info-item .label {
      min-width: auto;
      padding-right: 0;
    }
  }
</style> 