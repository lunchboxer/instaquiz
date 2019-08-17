<script>
  export let title = 'Warning'
</script>

<style>
  .warning {
    border: 1px solid #ffdd57;
    color: #ffdd57;
    margin-bottom: 1rem;
  }

  .warning :global(strong) {
    color: inherit;
  }

  .warning-message-header {
    margin: 0;
    padding: 0.3rem 0.5rem;
    background: #ffdd57;
    color: black;
    font-size: 1.2rem;
  }

  .warning-message-body {
    padding: 0.3rem 0.6rem;
  }
</style>

<div class="warning">
  <p class="warning-message-header">
    {title}
  </p>
  <section class="warning-message-body">
    <slot></slot>
  </section>
</div>