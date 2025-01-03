<script lang="ts">
  import { language, t } from '$lib/stores/i18nStore';
  import VerifyForm from '$lib/components/VerifyForm.svelte';
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
    <VerifyForm {verifyStatus} />
  {:else}
    <div class="message">
      {t('dashboard.verify.alreadySubmitted', $language)}
    </div>
  {/if}
</div>

<style>
  .verify-container {
    width: 100%;
    margin: 2rem auto;
    padding: 2rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  h2 {
    margin-bottom: 2rem;
    color: var(--text-color);
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

    /* .verify-status {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    } */
  }

  /* .verified-name {
    margin-top: 0.5rem;
    font-size: 0.9rem;
    color: #2F855A;
  }

  .message.success {
    background: #C6F6D5;
    border-color: #38A169;
    color: #2F855A;
  } */
</style> 