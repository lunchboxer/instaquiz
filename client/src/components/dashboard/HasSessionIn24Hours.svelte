<script>
  import { location } from 'svelte-spa-router'
  import { formatRelative, formatDistanceToNow } from 'date-fns'
  import Warning from '../Warning.svelte'
  import { every15Seconds, time, imminentSession, nowSession } from './stores'

  export let sessions

  const formatDate = date => {
    const string = formatRelative(new Date(date), new Date())
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  $: soon = new Date($time.getTime() + 10 * 6e4)
  // keep checking if there is a session currently on
  $: {
    nowSession.set(
      sessions.find(
        s => s.startsAt <= $time.toJSON() && s.endsAt >= $time.toJSON()
      )
    )
  }

  $: {
    imminentSession.set(
      sessions.find(
        s => s.startsAt < soon.toJSON() && s.startsAt > $time.toJSON()
      )
    )
  }

  // also update the upcoming sessions every 15 seconds
  $: in24Hours = new Date($every15Seconds.getTime() + 24 * 3.6e6)
  $: todaySessions = sessions.filter(s => {
    return (
      s.startsAt > $every15Seconds.toJSON() && s.endsAt < in24Hours.toJSON()
    )
  })
</script>

{#if $nowSession && $location !== '/'}
<Warning
  title="{$nowSession.course.name} lesson {$nowSession.order} has started."
>
  <p>
    Started {formatDistanceToNow(new Date($nowSession.startsAt), {
    includeSeconds: true, addSuffix: true })}. Ends
    {formatDate($nowSession.endsAt, { addSuffix: true })}.
  </p>
  <a class="button is-link" href="#/"
    ><i class="fas fa-running"></i>Go there now</a
  >
</Warning>
{:else if !$nowSession && $imminentSession && $location !== '/'}
<Warning
  title="{$imminentSession.course.name} lesson {$imminentSession.order} starts soon."
>
  <p>
    Starts {formatDistanceToNow(new Date($imminentSession.startsAt), {
    includeSeconds: true, addSuffix: true })}. Ends
    {formatDate($imminentSession.endsAt, { addSuffix: true })}.
  </p>
  <a class="button is-link" href="#/"
    ><i class="fas fa-running"></i>Go there now</a
  >
</Warning>
{:else if !$nowSession && !$imminentSession && todaySessions.length > 0}
<Warning title="{todaySessions.length} classes in the next 24 hours">
  <div class="upcoming-sessions">
    {#each todaySessions as session (session.id) }
    <li>
      <a href="#/session/{session.id}">
        {session.course.name} - {formatDate(session.startsAt)}.
      </a>
    </li>
    {/each}
  </div>
</Warning>
{/if}