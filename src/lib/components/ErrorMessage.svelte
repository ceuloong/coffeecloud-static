<script lang="ts">
  export let message: string;
</script>

<div class="error-container" role="alert">
  <i class="fas fa-exclamation-circle"></i>
  <span>{message}</span>
</div>

<style>
  .error-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.75rem 1rem;
    margin: 0.5rem 0;
    border-radius: 6px;
    background-color: #FEE2E2;
    border: 1px solid #FCA5A5;
    color: #DC2626;
    font-size: 0.875rem;
    animation: slideIn 0.2s ease-out;
  }

  i {
    font-size: 1rem;
  }

  @keyframes slideIn {
    from {
      transform: translateY(-10px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
</style> 