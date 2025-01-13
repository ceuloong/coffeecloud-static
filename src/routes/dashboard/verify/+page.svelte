<script lang="ts">
  import VerifyMethodSelector from '$lib/components/VerifyMethodSelector.svelte';
  import VerifyForm from '$lib/components/VerifyForm.svelte';
  import AutoVerifyForm from '$lib/components/AutoVerifyForm.svelte';
  import KiltVerifyForm from '$lib/components/KiltVerifyForm.svelte';
  import { language, t } from '$lib/stores/i18nStore';

  let selectedMethod: string | null = null;

  function handleMethodSelect(event: CustomEvent<string>) {
    selectedMethod = event.detail;
  }

  import type { VerifyStatus, UserStatus } from '$lib/types';
  
  export let data: { 
    verifyStatus: { status: VerifyStatus },
    userStatus: UserStatus,
    realName: string | null
  };

  let verifyStatus: VerifyStatus = data.verifyStatus.status;
</script>

<div class="verify-container">
  <h2>{t('dashboard.account.verify', $language)}</h2>

  {#if data.userStatus === 0}
    <div class="message warning">
      {t('dashboard.verify.waitingActivation', $language)}
    </div>
  {:else if verifyStatus === 'verified' && data.realName}
    <div class="message success">
      <p>{t('dashboard.verify.alreadyVerified', $language)}</p>
      <p class="verified-name">
        {t('dashboard.account.realName', $language)}: {data.realName}
      </p>
    </div>
  {:else if !['pending', 'verified'].includes(verifyStatus)}
    {#if !selectedMethod}
      <VerifyMethodSelector on:select={handleMethodSelect} />
    {:else}
      <div class="verify-container">
        <button class="back-button" on:click={() => selectedMethod = null}>
          <i class="fas fa-arrow-left"></i>
          {t('common.back', $language)}
        </button>

        {#if selectedMethod === 'manual'}
          <VerifyForm />
        {:else if selectedMethod === 'auto'}
          <AutoVerifyForm />
        {:else if selectedMethod === 'kilt'}
          <KiltVerifyForm />
        {/if}
      </div>
    {/if}
  {:else}
    <div class="message">
      {t('dashboard.verify.alreadySubmitted', $language)}
    </div>
  {/if}
</div>

<style>
  .verify-container {
    width: 100%;
    padding: 2rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  h2 {
    margin-bottom: 2rem;
    color: var(--text-color);
  }

  .back-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    margin-bottom: 2rem;
    background: none;
    border: none;
    color: var(--text-color);
    cursor: pointer;
    font-size: 1rem;
  }

  .back-button:hover {
    color: var(--primary-color);
  }

  .message {
    padding: 1rem;
    background: #F7FAFC;
    border: 1px solid #E2E8F0;
    color: var(--text-color);
    border-radius: 4px;
    text-align: center;
  }

  .message.warning {
    background: #FEF3C7;
    border-color: #F59E0B;
    color: #92400E;
  }

  @media (max-width: 640px) {
    .verify-container {
      margin: 1rem;
      padding: 1rem;
    }
  }
</style> 