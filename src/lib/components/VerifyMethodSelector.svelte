<script lang="ts">
  import { language, t } from '$lib/stores/i18nStore';
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  $: methods = [
    {
      id: 'manual',
      title: t('dashboard.verify.methods.manual.title', $language),
      description: t('dashboard.verify.methods.manual.description', $language),
      icon: 'fa-user-check'
    },
    {
      id: 'auto',
      title: t('dashboard.verify.methods.auto.title', $language),
      description: t('dashboard.verify.methods.auto.description', $language),
      icon: 'fa-robot'
    },
    {
      id: 'kilt',
      title: t('dashboard.verify.methods.kilt.title', $language),
      description: t('dashboard.verify.methods.kilt.description', $language),
      icon: 'fa-id-card'
    }
  ];

  function selectMethod(methodId: string) {
    dispatch('select', methodId);
  }
</script>

<div class="method-selector">
  <h2>{t('dashboard.verify.selectMethod', $language)}</h2>
  
  <div class="methods-grid">
    {#each methods as method}
      <button 
        class="method-card"
        on:click={() => selectMethod(method.id)}
      >
        <i class="fas {method.icon}"></i>
        <h3>{method.title}</h3>
        <p>{method.description}</p>
      </button>
    {/each}
  </div>
</div>

<style>
  .method-selector {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
  }

  h2 {
    text-align: center;
    margin-bottom: 2rem;
  }

  .methods-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .method-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    background: white;
    border: 1px solid #eee;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.2s;
    text-align: center;
  }

  .method-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .method-card i {
    font-size: 2.5rem;
    color: var(--primary-color);
    margin-bottom: 1rem;
  }

  .method-card h3 {
    margin-bottom: 0.5rem;
    color: var(--text-color);
  }

  .method-card p {
    color: var(--text-secondary);
    line-height: 1.5;
  }
</style> 