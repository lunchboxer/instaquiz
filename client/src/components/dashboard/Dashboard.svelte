<script>
  import { formatDistanceStrict } from 'date-fns'
  import { imminentSession, activeSession } from './stores'
  import ActiveSession from './ActiveSession.svelte'
  import Terms from '../terms/Terms.svelte'
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

<svelte:head>
  <title>Dashboard</title>
</svelte:head>

{#if $activeSession}
  <ActiveSession />
{:else if $imminentSession}
  <section class="countdown">
    <h2>{$imminentSession.course.name}</h2> 
      <h2>Lesson {$imminentSession.order}</h2>
      <p>starts in...</p>
    <p class="big">{formatDistanceStrict(new Date($imminentSession.startsAt), new Date(), { addSuffix: true })}</p>
  </section>
{:else}
  <Terms />
{/if}