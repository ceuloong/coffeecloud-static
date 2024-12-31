<script lang="ts">
  import { language, t } from '$lib/stores/i18nStore';
  import ErrorMessage from '$lib/components/ErrorMessage.svelte';
  
  let email = '';
  let username = '';
  let password = '';
  let confirmPassword = '';
  let errors: { [key: string]: string } = {};
  let loading = false;

  function validateForm() {
    errors = {};
    
    if (!username) {
      errors.username = t('auth.errors.usernameRequired', $language);
    } else if (username.length < 3) {
      errors.username = t('auth.errors.usernameLength', $language);
    }

    if (!email) {
      errors.email = t('auth.errors.emailRequired', $language);
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = t('auth.errors.emailInvalid', $language);
    }

    if (!password) {
      errors.password = t('auth.errors.passwordRequired', $language);
    } else if (password.length < 6) {
      errors.password = t('auth.errors.passwordLength', $language);
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = t('auth.errors.passwordMismatch', $language);
    }

    return Object.keys(errors).length === 0;
  }

  async function handleRegister(event: SubmitEvent) {
    event.preventDefault();
    if (!validateForm()) return;
    
    loading = true;
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || t('auth.registerFailed', $language));
      }

      window.location.href = '/login?registered=true';
    } catch (err) {
      console.error('Registration error:', err);
      errors.submit = err instanceof Error ? err.message : t('auth.registerFailed', $language);
    } finally {
      loading = false;
    }
  }
</script>

<div class="register-container">
  <form on:submit={handleRegister} class="register-form">
    <h2>{t('auth.register', $language)}</h2>
    
    <div class="form-group">
      <label for="username">{t('auth.username', $language)}</label>
      <div class="input-group" class:error={errors.username}>
        <i class="fas fa-user"></i>
        <input
          type="text"
          id="username"
          bind:value={username}
          disabled={loading}
          placeholder={t('auth.usernamePlaceholder', $language)}
        />
      </div>
      {#if errors.username}
        <ErrorMessage message={errors.username} />
      {/if}
    </div>

    <div class="form-group">
      <label for="email">{t('auth.email', $language)}</label>
      <div class="input-group" class:error={errors.email}>
        <i class="fas fa-envelope"></i>
        <input
          type="email"
          id="email"
          bind:value={email}
          disabled={loading}
          placeholder={t('auth.emailPlaceholder', $language)}
        />
      </div>
      {#if errors.email}
        <ErrorMessage message={errors.email} />
      {/if}
    </div>

    <div class="form-group">
      <label for="password">{t('auth.password', $language)}</label>
      <div class="input-group" class:error={errors.password}>
        <i class="fas fa-lock"></i>
        <input
          type="password"
          id="password"
          bind:value={password}
          disabled={loading}
          placeholder={t('auth.passwordPlaceholder', $language)}
        />
      </div>
      {#if errors.password}
        <ErrorMessage message={errors.password} />
      {/if}
    </div>

    <div class="form-group">
      <label for="confirmPassword">{t('auth.confirmPassword', $language)}</label>
      <div class="input-group" class:error={errors.confirmPassword}>
        <i class="fas fa-lock"></i>
        <input
          type="password"
          id="confirmPassword"
          bind:value={confirmPassword}
          disabled={loading}
          placeholder={t('auth.confirmPasswordPlaceholder', $language)}
        />
      </div>
      {#if errors.confirmPassword}
        <ErrorMessage message={errors.confirmPassword} />
      {/if}
    </div>

    {#if errors.submit}
      <ErrorMessage message={errors.submit} />
    {/if}

    <button type="submit" class="register-btn" disabled={loading}>
      {loading ? t('common.loading', $language) : t('auth.register', $language)}
    </button>

    <div class="login-link">
      {t('auth.hasAccount', $language)}
      <a href="/login">{t('auth.login', $language)}</a>
    </div>
  </form>
</div>

<style>
  .register-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    background: linear-gradient(135deg, #1a365d 0%, #2b6cb0 100%);
  }

  .register-form {
    background: white;
    padding: 2rem;
    border-radius: 12px;
    width: 100%;
    max-width: 400px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  h2 {
    text-align: center;
    color: var(--primary-color);
    margin-bottom: 2rem;
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  label {
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

  .input-group.error {
    border-color: #DC2626;
  }

  input {
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

  .register-btn {
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

  .register-btn:hover:not(:disabled) {
    background: var(--secondary-color);
  }

  .register-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .login-link {
    text-align: center;
    margin-top: 1.5rem;
    color: #4a5568;
  }

  .login-link a {
    color: var(--primary-color);
    text-decoration: none;
    font-weight: 500;
    margin-left: 0.25rem;
  }

  .login-link a:hover {
    text-decoration: underline;
  }
</style> 