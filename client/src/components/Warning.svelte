<script>
  export let title = 'Warning'
</script>

<style>
  .warning {
    margin-bottom: 1rem;
    border-radius: 4px;
    padding: 0;
  }

  .warning :global(strong) {
    color: inherit;
  }

  .warning-message-body {
    padding: 0.5rem;
  }

  .warning-message-header {
    margin: 0;
    color: var(--background);
    padding: 0.5rem 1rem;
    border-radius: 4px 4px 0 0;
    border-bottom: 2px solid var(--background);
  }
</style>

<div class="warning">
  <h4 class="warning-message-header">
    {title}
  </h4>
  <section class="warning-message-body">
    <slot></slot>
  </section>
</div>