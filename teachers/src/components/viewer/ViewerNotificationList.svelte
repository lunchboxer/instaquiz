<script>
  import { fly } from 'svelte/transition'
  import ViewerNotificationItem from './ViewerNotificationItem.svelte'
  import { notifications } from '../notifications'
</script>

<style>
  .viewer-notification-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    bottom: 1rem;
    left: 0;
    right: 0;
    width: 100vw;
    z-index: 99;
  }
</style>

{#if $notifications}
  <div class="viewer-notification-list">
    {#each Object.entries($notifications) as [id, message] (id)}
      <div transition:fly="{{ y: 100 }}" >
        <ViewerNotificationItem message={message} id={id} />
      </div>
    {/each}
  </div>
  {/if}