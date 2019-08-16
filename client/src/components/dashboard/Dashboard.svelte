<script>
  import { formatDistanceStrict } from 'date-fns'
  import { nowSession, imminentSession } from './stores'
  import ActiveSession from './ActiveSession.svelte'
  import Terms from '../terms/Terms.svelte'
  import { user } from '../../data/user'
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

{#if $nowSession}
  <ActiveSession />
{:else if $imminentSession}
  <section class="countdown">
    <h2 class="title is-3">{$imminentSession.course.name}</h2> 
      <h2 class="subtitle is-5">Lesson {$imminentSession.order}</h2>
      <p>starts in...</p>
    <p class="big">{formatDistanceStrict(new Date($imminentSession.startsAt), new Date(), { addSuffix: true })}</p>
  </section>
{:else}
  {#if $user.role ==='Student'}
    <Terms />
    {:else}
    <h1 class="title">Dashboard</h1>
  {/if}
{/if}