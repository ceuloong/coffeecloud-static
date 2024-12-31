<script lang="ts">
  import { userStore } from '$lib/stores/userStore';
  import { goto } from '$app/navigation';
  import { language, t } from '$lib/stores/i18nStore';

  export let data;

  let email = '';
  let password = '';
  let error = '';
  let loading = false;
  let success = data.registered ? t('auth.registerSuccess', $language) : '';

  async function handleLogin(event: SubmitEvent) {
    event.preventDefault();
    error = '';
    success = '';
    loading = true;

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || t('auth.loginFailed', $language));
      }

      userStore.login({
        ...data.user,
        isLoggedIn: true
      });
      
      success = t('auth.loginSuccess', $language);

      try {
        window.location.href = '/dashboard';
      } catch (navError) {
        console.error('Navigation error:', navError);
      }
    } catch (err: unknown) {
      console.error('Login error:', err);
      error = err instanceof Error ? err.message : t('auth.loginFailed', $language);
    } finally {
      loading = false;
    }
  }
</script>

<div class="login-container">
  <div class="login-content">
    <!-- 左侧介绍区域 -->
    <div class="intro-section">
      <div class="logo-area">
        <img src="/images/logo.svg" alt="CoffeeCloud Logo" class="logo" />
        <h1 class="brand">CoffeeCloud</h1>
      </div>
      <div class="features">
        <h2>{t('login.features.title', $language)}</h2>
        <div class="feature-item">
          <i class="fas fa-server"></i>
          <div class="feature-text">
            <h3>{t('login.features.power.title', $language)}</h3>
            <p>{t('login.features.power.desc', $language)}</p>
          </div>
        </div>
        <div class="feature-item">
          <i class="fas fa-shield-alt"></i>
          <div class="feature-text">
            <h3>{t('login.features.security.title', $language)}</h3>
            <p>{t('login.features.security.desc', $language)}</p>
          </div>
        </div>
        <div class="feature-item">
          <i class="fas fa-chart-line"></i>
          <div class="feature-text">
            <h3>{t('login.features.earnings.title', $language)}</h3>
            <p>{t('login.features.earnings.desc', $language)}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 右侧登录框 -->
    <div class="login-box">
      <h2>{t('common.login', $language)}</h2>
      <form on:submit={handleLogin}>
        {#if error}
          <div class="error-message">{error}</div>
        {/if}
        {#if success}
          <div class="success-message">{success}</div>
        {/if}
        <div class="form-group">
          <label for="email">{t('auth.email', $language)}</label>
          <div class="input-group">
            <i class="fas fa-envelope"></i>
            <input
              type="email"
              id="email"
              bind:value={email}
              required
              disabled={loading}
              placeholder={t('auth.emailPlaceholder', $language)}
            />
          </div>
        </div>
        <div class="form-group">
          <label for="password">{t('auth.password', $language)}</label>
          <div class="input-group">
            <i class="fas fa-lock"></i>
            <input
              type="password"
              id="password"
              bind:value={password}
              required
              disabled={loading}
              placeholder={t('auth.passwordPlaceholder', $language)}
            />
          </div>
        </div>
        <div class="form-options">
          <label class="remember-me">
            <input type="checkbox" />
            <span>{t('login.rememberMe', $language)}</span>
          </label>
          <a href="/forgot-password" class="forgot-password">
            {t('login.forgotPassword', $language)}
          </a>
        </div>
        <button type="submit" class="login-btn" disabled={loading}>
          {loading ? t('common.loading', $language) : t('common.login', $language)}
        </button>
      </form>
      <div class="register-section">
        <p>{t('auth.noAccount', $language)}</p>
        <a href="/register" class="register-btn">
          {t('common.register', $language)}
        </a>
      </div>
    </div>
  </div>
</div>

<style>
  .login-container {
    min-height: calc(100vh - 64px);
    background: linear-gradient(135deg, #1a365d 0%, #2b6cb0 100%);
    padding: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .login-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    max-width: 1200px;
    width: 100%;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 16px;
    padding: 3rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }

  .intro-section {
    color: white;
  }

  .logo-area {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 3rem;
  }

  .logo {
    width: 48px;
    height: 48px;
  }

  .brand {
    font-size: 2rem;
    font-weight: bold;
  }

  .features {
    margin-top: 2rem;
  }

  .feature-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 2rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
  }

  .feature-item i {
    font-size: 1.5rem;
    color: #4fd1c5;
  }

  .login-box {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .social-login {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin: 1.5rem 0;
  }

  .social-btn {
    padding: 0.75rem;
    border: none;
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    cursor: pointer;
    transition: all 0.2s;
  }

  .social-btn.wechat {
    background: #07c160;
    color: white;
  }

  .social-btn.telegram {
    background: #0088cc;
    color: white;
  }

  .divider {
    text-align: center;
    margin: 1.5rem 0;
    position: relative;
  }

  .divider::before,
  .divider::after {
    content: '';
    position: absolute;
    top: 50%;
    width: 45%;
    height: 1px;
    background: #e2e8f0;
  }

  .divider::before {
    left: 0;
  }

  .divider::after {
    right: 0;
  }

  .input-group {
    position: relative;
  }

  .input-group i {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #718096;
  }

  .input-group input {
    padding-left: 2.5rem;
  }

  .form-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1rem 0;
  }

  .remember-me {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .forgot-password {
    color: var(--primary-color);
    text-decoration: none;
  }

  .register-section {
    text-align: center;
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid #e2e8f0;
  }

  .register-btn {
    display: inline-block;
    padding: 0.5rem 1rem;
    color: var(--primary-color);
    border: 1px solid var(--primary-color);
    border-radius: 4px;
    text-decoration: none;
    margin-top: 0.5rem;
    transition: all 0.2s;
  }

  .register-btn:hover {
    background: var(--primary-color);
    color: white;
  }

  @media (max-width: 768px) {
    .login-content {
      grid-template-columns: 1fr;
      gap: 2rem;
    }

    .intro-section {
      display: none;
    }
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    color: #4a5568;
    font-weight: 500;
  }

  .input-group {
    position: relative;
    border: 2px solid #e2e8f0;
    border-radius: 8px;
    transition: all 0.2s;
  }

  .input-group:focus-within {
    border-color: var(--primary-color);
  }

  .input-group input {
    width: 100%;
    padding: 0.75rem 1rem 0.75rem 2.5rem;
    border: none;
    background: none;
    outline: none;
    font-size: 1rem;
  }

  .input-group i {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #718096;
  }

  .login-btn {
    width: 100%;
    padding: 0.875rem;
    background: var(--primary-color);
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
  }

  .login-btn:hover:not(:disabled) {
    background: var(--secondary-color);
  }

  .login-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .error-message,
  .success-message {
    padding: 0.75rem;
    border-radius: 8px;
    margin-bottom: 1rem;
    font-size: 0.875rem;
  }

  .error-message {
    background: #fff5f5;
    color: #e53e3e;
    border: 1px solid #feb2b2;
  }

  .success-message {
    background: #f0fff4;
    color: #2f855a;
    border: 1px solid #9ae6b4;
  }
</style> 