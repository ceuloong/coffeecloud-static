<script lang="ts">
  import { language, t } from '$lib/stores/i18nStore';
  import VerifyForm from '$lib/components/VerifyForm.svelte';
  import type { VerifyStatus, UserStatus } from '$lib/types';
  
  export let data: { 
    verifyStatus: { status: VerifyStatus },
    userStatus: UserStatus 
  };

  let verifyStatus: VerifyStatus = data.verifyStatus.status;
</script>

<div class="verify-container">
  <h2>{t('dashboard.account.verify', $language)}</h2>

  <!-- <div class="verify-status">
    <span class="status-label">{t('dashboard.account.verifyStatus', $language)}:</span>
    <span class="status-badge {verifyStatus}">
      {t(`dashboard.verify.status.${verifyStatus}`, $language)}
    </span>
  </div> -->

  {#if data.userStatus === 0}
    <div class="message warning">
      {t('dashboard.verify.waitingActivation', $language)}
    </div>
  {:else if !['pending', 'verified'].includes(verifyStatus)}
    <VerifyForm {verifyStatus} />
  {:else if 'pending' === verifyStatus}
    <div class="message">
      {t('dashboard.verify.alreadySubmitted', $language)}
    </div>
  {:else if 'verified' === verifyStatus}
    <div class="message">
      {t('dashboard.verify.alreadyVerified', $language)}
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

  .verify-status {
    margin-bottom: 2rem;
    padding: 1rem;
    background: #F7FAFC;
    border-radius: 6px;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .status-label {
    color: var(--text-light);
    font-size: 0.875rem;
  }

  .status-badge {
    padding: 0.25rem 0.75rem;
    border-radius: 4px;
    font-size: 0.875rem;
    font-weight: 500;
  }

  .status-badge.none {
    background: #E2E8F0;
    color: #4A5568;
  }

  .status-badge.pending {
    background: #FEF3C7;
    color: #92400E;
  }

  .status-badge.verified {
    background: #D1FAE5;
    color: #065F46;
  }

  .status-badge.rejected {
    background: #FEE2E2;
    color: #991B1B;
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

    .verify-status {
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }
  }
</style> 