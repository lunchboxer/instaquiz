<script>
  import { formatDistanceStrict } from 'date-fns'
  import { imminentSession, activeSession } from '../dashboard/stores'
  import ViewerActive from './ViewerActive.svelte'
  import ViewerNotificationList from './ViewerNotificationList.svelte'
</script>

<style>
  .countdown {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    justify-content: center;
    height: calc(100vh - 12rem);
    width: 100%;
    font-size: 5rem;
    border: 1px solid red;
    margin: 0;
  }

  .big {
    font-size: 5rem;
  }
</style>

{#if $activeSession}
  <ViewerActive session={$activeSession} />
{:else if $imminentSession}
  <section class="countdown">
    <span>{$imminentSession.course.name}</span> 
    <span>Lesson {$imminentSession.order}</span>
    <p>starts in...</p>
    <p class="big">{formatDistanceStrict(new Date($imminentSession.startsAt), new Date(), { addSuffix: true })}</p>
  </section>
{:else}
  <p>No class session active or imminent.</p>
{/if}

<ViewerNotificationList />