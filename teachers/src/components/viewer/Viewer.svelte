<script>
  import { formatDistanceStrict } from 'date-fns'
  import { imminentSession, activeSession } from '../dashboard/stores'
  import ViewerActive from './ViewerActive.svelte'
  import ViewerNotificationList from './ViewerNotificationList.svelte'
</script>

<style>
  .countdown {
    padding: 2rem;
    text-align: center;
    font-size: 3rem;
  }

  .big {
    font-size: 3rem;
  }
</style>

{#if $activeSession}
  <ViewerActive session={$activeSession} />
{:else if $imminentSession}
  <section class="countdown">
    <h1>{$imminentSession.course.name}</h1> 
    <h1>Lesson {$imminentSession.order}</h1>
    <p>starts in...</p>
    <p class="big">{formatDistanceStrict(new Date($imminentSession.startsAt), new Date(), { addSuffix: true })}</p>
  </section>
{:else}
  <p>No class session active or imminent.</p>
{/if}

<ViewerNotificationList />