<script lang="ts">
  import { language, t } from '$lib/stores/i18nStore';
  
  let currentPassword = '';
  let newPassword = '';
  let confirmPassword = '';
  let error = '';
  let success = '';

  async function handlePasswordChange() {
    error = '';
    success = '';
    
    if (newPassword !== confirmPassword) {
      error = t('dashboard.password.mismatch', $language);
      return;
    }

    try {
      const response = await fetch('/api/user/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      success = t('dashboard.password.success', $language);
      currentPassword = '';
      newPassword = '';
      confirmPassword = '';
    } catch (err: any) {
      error = err.message;
    }
  }
</script>

<div class="password-container">
  <div class="card-header">
    <h2>{t('dashboard.password.title', $language)}</h2>
  </div>

  <div class="card-content">
    {#if error}
      <div class="error-message">
        <i class="fas fa-exclamation-circle"></i>
        {error}
      </div>
    {/if}
    {#if success}
      <div class="success-message">
        <i class="fas fa-check-circle"></i>
        {success}
      </div>
    {/if}

    <form on:submit|preventDefault={handlePasswordChange} class="password-form">
      <div class="form-group">
        <label for="currentPassword">{t('dashboard.password.current', $language)}</label>
        <input
          type="password"
          id="currentPassword"
          bind:value={currentPassword}
          required
        />
      </div>

      <div class="form-group">
        <label for="newPassword">{t('dashboard.password.new', $language)}</label>
        <input
          type="password"
          id="newPassword"
          bind:value={newPassword}
          required
        />
      </div>

      <div class="form-group">
        <label for="confirmPassword">{t('dashboard.password.confirm', $language)}</label>
        <input
          type="password"
          id="confirmPassword"
          bind:value={confirmPassword}
          required
        />
      </div>

      <button type="submit" class="submit-button">
        <i class="fas fa-save"></i>
        {t('common.submit', $language)}
      </button>
    </form>
  </div>
</div>

<style>
  .password-container {
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
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .password-form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 50%;
  }

  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  label {
    color: var(--text-light);
    font-size: 0.875rem;
  }

  input {
    padding: 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: 4px;
    font-size: 1rem;
    transition: border-color 0.2s;
  }

  input:focus {
    outline: none;
    border-color: var(--primary-color);
  }

  .submit-button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background: var(--primary-color);
    color: white;
    padding: 0.75rem;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .submit-button:hover {
    background: var(--primary-dark);
  }

  .error-message, .success-message {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem;
    border-radius: 4px;
    margin-bottom: 1.5rem;
  }

  .error-message {
    background: #FEE2E2;
    border: 1px solid #F87171;
    color: #DC2626;
  }

  .success-message {
    background: #D1FAE5;
    border: 1px solid #34D399;
    color: #059669;
  }

  @media (max-width: 640px) {
    .card-header {
      padding: 1rem;
    }

    .card-content {
      padding: 1rem;
    }

    .password-form {
      gap: 1rem;
      width: 100%;
    }

    .submit-button {
      width: 100%;
    }
  }
</style> 