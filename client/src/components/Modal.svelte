<script>
  import { fade, fly } from 'svelte/transition'

  export let open = false

  const close = () => { open = false }
</script>

<style>
  .modal-container {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
    position: fixed;
    z-index: 40;
    bottom: 0;
    left: 0;
    right: 0;
    top: 0;
  }

  .close {
    float: right;
    position: absolute;
    top: 1rem;
    right: 1rem;
  }

  .modal-background {
    width: 100%;
    height: 100%;
    z-index: 2;
    background-color: #000;
    opacity: 0.5;
    position: absolute;
    top: 0;
    left: 0;
    margin: 0;
    padding: 0;
  }

  .modal {
    background: black;
    display: flex;
    justify-content: center;
    border-radius: 4px;
    z-index: 3;
    padding: 2rem;
  }

  section {
    padding: 1rem 2rem;
  }
</style>

{#if open}
<div class="modal-container">
  <div class="modal-background" on:click={close} transition:fade|local="{{ duration: 200 }}">
    <button class="close">
      &times;
    </button>
  </div>
  <div class="modal" in:fly="{{ duration: 200, y: -300 }}" out:fly="{{ duration: 200, y: 300 }}">
    <section>
      <slot></slot>
    </section>
  </div>
</div>
{/if}