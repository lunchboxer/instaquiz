<script>
  import { formatDistanceStrict } from 'date-fns'
  import { imminentSession, term } from '../../data/stores'
  import TermDetails from './TermDetails.svelte'
  import Loading from '../Loading.svelte'
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

{#if $imminentSession}
  <section class="countdown">
    <h2>{$imminentSession.course.name}</h2> 
    <h2>Lesson {$imminentSession.order}</h2>
    <p>starts in...</p>
    <p class="big">{formatDistanceStrict(new Date($imminentSession.startsAt), new Date(), { addSuffix: true })}</p>
  </section>
{:else}
  {#if $term}
    {#if !$term.id}
      <h1>Current Term</h1>
      <p>There is no registered term currently in session.</p>
    {:else}
      <TermDetails term={$term}/>
    {/if}
  {:else}
    <Loading what="terms and courses" />
  {/if}
{/if}