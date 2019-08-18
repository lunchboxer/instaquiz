<script>
  import { fly } from 'svelte/transition'
  import NotificationItem from './NotificationItem.svelte'
  import { notifications } from './data'
</script>

<style>
  .notification-list {
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 4rem;
    right: 0;
    margin: 0.5rem;
    width: auto;
    max-width: calc(100% - 4rem);
    z-index: 99;
  }
</style>

{#if $notifications}
<div class="notification-list">
  {#each Object.entries($notifications) as [id, message] (id)}
  <div transition:fly="{{ x: 400 }}" >
      <NotificationItem message={message} id={id} />
  </div>
   
  {/each}
</div>
{/if}