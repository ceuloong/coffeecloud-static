<script lang="ts">
  import ContactForm from '$lib/components/ContactForm.svelte';
  import { language, t } from '$lib/stores/i18nStore';
</script>

<div class="contact-page">
  <h1>{t('contact.title', $language)}</h1>
  <p class="description">{t('contact.description', $language)}</p>
  
  <ContactForm on:success={() => {
    // 可以添加成功后的处理逻辑
  }} />
</div>

<style>
  .contact-page {
    width: 100%;
    max-width: 800px;
    margin: 2rem auto;
    padding: 0 1rem;
  }

  h1 {
    text-align: center;
    margin-bottom: 1rem;
  }

  .description {
    text-align: center;
    margin-bottom: 2rem;
    color: var(--text-secondary);
  }
</style> 