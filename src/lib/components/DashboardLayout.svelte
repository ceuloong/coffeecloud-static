<script lang="ts">
  import { language, t } from '$lib/stores/i18nStore';
  import { page } from '$app/stores';
  
  interface User {
    username: string;
    email?: string;
    status: number;
  }

  export let user: User = { username: '', status: 0 };
  export let verifyStatus = 'none';

  // 检查是否可以提交认证
  function canSubmitVerification() {
    if (user.status === 0) {
      return false;
    }
    return !['pending', 'verified'].includes(verifyStatus);
  }

  // 获取当前路径
  $: currentPath = $page.url.pathname;
</script>

<div class="dashboard-container">
  <div class="dashboard-header">
    <h1>{t('common.dashboard', $language)}</h1>
    <p class="welcome-text">{t('common.welcome', $language)}, {user.username}!</p>
  </div>

  <div class="dashboard-layout">
    <!-- 左侧菜单 -->
    <div class="sidebar">
      <a 
        href="/dashboard"
        class="menu-item"
        class:active={currentPath === '/dashboard'}
      >
        <i class="fas fa-home"></i>
        {t('dashboard.menu.console', $language)}
      </a>
      <a 
        href="/dashboard/account"
        class="menu-item"
        class:active={currentPath === '/dashboard/account'}
      >
        <i class="fas fa-user"></i>
        {t('dashboard.menu.account', $language)}
      </a>
      <a 
        href="/dashboard/password"
        class="menu-item"
        class:active={currentPath === '/dashboard/password'}
      >
        <i class="fas fa-key"></i>
        {t('dashboard.account.changePassword', $language)}
      </a>
      <a 
        href="/dashboard/verify"
        class="menu-item"
        class:active={currentPath === '/dashboard/verify'}
        class:disabled={!canSubmitVerification()}
      >
        <i class="fas fa-id-card"></i>
        {t('dashboard.account.verify', $language)}
        {#if verifyStatus === 'pending'}
          ({t('dashboard.verify.status.pending', $language)})
        {/if}
      </a>
      <!-- <div class="menu-item">
        <i class="fas fa-wallet"></i>
        {t('dashboard.menu.wallet', $language)}
      </div> -->
      <a 
        href="/dashboard/earnings"
        class="menu-item"
        class:active={currentPath === '/dashboard/earnings'}
      >
        <i class="fas fa-chart-line"></i>
        {t('dashboard.menu.earnings', $language)}
      </a>
    </div>

    <!-- 右侧内容 -->
    <div class="main-content">
      <slot />
    </div>
  </div>
</div>

<style>
  .dashboard-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  .dashboard-header {
    margin-bottom: 2rem;
    text-align: center;
  }

  h1 {
    color: var(--primary-color);
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  .welcome-text {
    color: var(--secondary-color);
    font-size: 1.2rem;
  }

  .dashboard-layout {
    display: flex;
    gap: 2rem;
  }

  .sidebar {
    width: 200px;
    flex-shrink: 0;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 1rem;
  }

  .main-content {
    flex: 1;
    min-width: 0;
    width: 1400px;
  }

  .menu-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    color: var(--text-color);
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.2s;
  }

  .menu-item:hover:not(.disabled) {
    background: rgba(var(--primary-rgb), 0.1);
    color: var(--primary-color);
  }

  .menu-item.active {
    background: var(--primary-color);
    color: white;
  }

  .menu-item.active:hover {
    background: var(--primary-color);
    opacity: 0.9;
    color: white;
  }

  .menu-item.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    .dashboard-layout {
      flex-direction: column;
    }

    .sidebar {
      width: 100%;
    }
  }
</style> 