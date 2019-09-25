<script>
  import { formatDistanceStrict } from 'date-fns'
  import { imminentSession, activeSession } from './stores'
</script>

<style>
  .countdown {
    padding: 2rem;
    text-align: center;
    font-size: 2rem;
  }

  .big {
    font-size: 3rem;
  }
</style>

{#if $activeSession}
  <p>viewer</p>
  {:else if $imminentSession}
    <section class="countdown">
      <h2>{$imminentSession.course.name}</h2> 
        <h2>Lesson {$imminentSession.order}</h2>
        <p>starts in...</p>
      <p class="big">{formatDistanceStrict(new Date($imminentSession.startsAt), new Date(), { addSuffix: true })}</p>
    </section>
  {:else}
    <p>No class session active or imminent.</p>
  {/if}