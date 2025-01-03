<script lang="ts">
  import '../app.css';
  import { userStore } from '$lib/stores/userStore';
  import { language, t } from '$lib/stores/i18nStore';
  import { onMount } from 'svelte';

  // 监听用户状态
  $: if ($userStore?.status === 2) {
    handleLogout();
  }

  onMount(() => {
    language.init();
  });

  async function handleLogout() {
    try {
      const response = await fetch('/api/auth/logout', { 
        method: 'POST',
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Logout failed');
      }

      userStore.logout();
      
      window.location.href = '/login';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  }

  function toggleLanguage() {
    language.setLanguage($language === 'zh' ? 'en' : 'zh');
  }
</script>

<div class="app">
  <header>
    <nav>
      <div class="nav-left">
        <a href="/" class="logo">
          <img src="/images/logo.svg" alt="CoffeeCloud" />
          CoffeeCloud
        </a>
      </div>
      <div class="nav-right">
        <a href="/products">{t('common.products', $language)}</a>
        {#if $userStore}
          <a href="/dashboard">{t('common.dashboard', $language)}</a>
          <button class="logout-btn" on:click={handleLogout}>
            {t('common.logout', $language)}
          </button>
        {:else}
          <a href="/login">{t('common.login', $language)}</a>
          <a href="/register">{t('common.register', $language)}</a>
        {/if}
        <button class="lang-btn" on:click={toggleLanguage}>
          {$language === 'zh' ? 'EN' : '中文'}
        </button>
      </div>
    </nav>
  </header>

  <slot />

  <footer>
    <div class="footer-content">
      <div class="footer-section">
        <h3>{t('footer.contactUs', $language)}</h3>
        <p>{t('footer.email', $language)}: support@coffeecloud.info</p>
        <p>{t('footer.phone', $language)}: 400-XXX-XXXX</p>
      </div>
      <div class="footer-section">
        <h3>{t('footer.followUs', $language)}</h3>
        <div class="social-links">
          <a href="#" target="_blank">WeChat</a>
          <a href="#" target="_blank">Telegram</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2024 CoffeeCloud. {t('footer.copyright', $language)}.</p>
    </div>
  </footer>
</div>

<style>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  header {
    background-color: var(--header-bg);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
    height: 64px;
  }

  .nav-left {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: var(--header-text);
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .logo img {
    width: 32px;
    height: 32px;
  }

  .nav-right {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  nav a {
    color: var(--header-text);
    text-decoration: none;
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    transition: background-color 0.2s;
  }

  nav a:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .logout-btn {
    background: none;
    border: 1px solid var(--header-text);
    color: var(--header-text);
    padding: 0.5rem 1rem;
    border-radius: 4px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .logout-btn:hover {
    background-color: var(--header-text);
    color: var(--header-bg);
  }

  .lang-btn {
    background: none;
    border: 1px solid var(--header-text);
    color: var(--header-text);
    padding: 0.5rem 1rem;
    border-radius: 4px;
    cursor: pointer;
    font-size: 0.875rem;
    transition: all 0.2s;
  }

  .lang-btn:hover {
    background-color: var(--header-text);
    color: var(--header-bg);
  }

  footer {
    margin-top: auto;
    background-color: var(--bg-dark);
    color: var(--header-text);
  }

  .footer-content {
    max-width: 1200px;
    margin: 0 auto;
    padding: 3rem 1rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 3rem;
  }

  .footer-section h3 {
    color: var(--accent-color);
    margin-bottom: 1.5rem;
    font-size: 1.25rem;
  }

  .footer-section p {
    color: var(--text-light);
    margin-bottom: 0.5rem;
  }

  .social-links {
    display: flex;
    gap: 1.5rem;
  }

  .social-links a {
    color: var(--text-light);
    text-decoration: none;
    transition: color 0.2s;
  }

  .social-links a:hover {
    color: var(--accent-color);
  }

  .footer-bottom {
    text-align: center;
    padding: 1.5rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    color: var(--text-light);
  }

  @media (max-width: 768px) {
    .nav-right {
      gap: 1rem;
    }

    nav a, .logout-btn, .lang-btn {
      padding: 0.375rem 0.75rem;
      font-size: 0.875rem;
    }
  }
</style> 