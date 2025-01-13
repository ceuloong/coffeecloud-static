<script lang="ts">
  import { language, t } from '$lib/stores/i18nStore';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  let email = '';
  let subject = '';
  let message = '';
  let error = '';
  let success = '';
  let loading = false;

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    error = '';
    success = '';
    loading = true;

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({ email, subject, message })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      success = t('contact.submitSuccess', $language);
      dispatch('success');
      
      // 清空表单
      email = '';
      subject = '';
      message = '';
    } catch (err: any) {
      error = err.message;
    } finally {
      loading = false;
    }
  }
</script>

<form class="contact-form" on:submit={handleSubmit}>
  {#if error}
    <div class="error-message">{error}</div>
  {/if}
  {#if success}
    <div class="success-message">{success}</div>
  {/if}

  <div class="form-group">
    <label for="email">{t('contact.email', $language)}</label>
    <input
      type="email"
      id="email"
      bind:value={email}
      required
      placeholder={t('contact.emailPlaceholder', $language)}
    />
  </div>

  <div class="form-group">
    <label for="subject">{t('contact.subject', $language)}</label>
    <input
      type="text"
      id="subject"
      bind:value={subject}
      required
      placeholder={t('contact.subjectPlaceholder', $language)}
    />
  </div>

  <div class="form-group">
    <label for="message">{t('contact.message', $language)}</label>
    <textarea
      id="message"
      bind:value={message}
      required
      rows="5"
      placeholder={t('contact.messagePlaceholder', $language)}
    ></textarea>
  </div>

  <button type="submit" class="submit-button" disabled={loading}>
    {loading ? t('common.submitting', $language) : t('contact.submit', $language)}
  </button>
</form>

<style>
  .contact-form {
    max-width: 600px;
    margin: 0 auto;
    padding: 2rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  .form-group {
    margin-bottom: 1.5rem;
  }

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: var(--text-color);
  }

  input, textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }

  textarea {
    resize: vertical;
  }

  .submit-button {
    width: 100%;
    padding: 0.75rem;
    background-color: var(--primary-color);
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .submit-button:hover {
    background-color: var(--primary-dark);
  }

  .submit-button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  .error-message {
    color: var(--error-color);
    margin-bottom: 1rem;
    padding: 0.5rem;
    border-radius: 4px;
    background-color: var(--error-bg);
  }

  .success-message {
    color: var(--success-color);
    margin-bottom: 1rem;
    padding: 0.5rem;
    border-radius: 4px;
    background-color: var(--success-bg);
  }
</style> 