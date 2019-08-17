<script>
  export let title = 'Warning'
</script>

<style>
  .warning {
    color: #ffdd57;
    margin-bottom: 1rem;
    border-radius: 5px;
    padding: 0;
  }

  .warning :global(strong) {
    color: inherit;
  }

  .warning-message-header {
    margin: 0;
    padding: 0.5rem 1rem;
    color: #ffdd57;
    background: black;
    border-radius: 4px 4px 0 0;
    border: 1px solid #ffdd57;
  }

  .warning-message-body {
    padding: 0.5rem 1rem;
  }
</style>

<div class="warning">
  <h3 class="warning-message-header">
    {title}
  </h3>
  <section class="warning-message-body">
    <slot></slot>
  </section>
</div>