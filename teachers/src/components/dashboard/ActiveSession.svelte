<script>
  import { formatRelative } from 'date-fns'
  import { activeSession, every15Seconds } from './stores'
  import ActiveTeacherSession from './ActiveTeacherSession.svelte'

  const formatDate = (date) => {
    const string = formatRelative(new Date(date), new Date())
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const exit = () => {
    activeSession.set()
  }
  $: classIsOver = $activeSession.endsAt < $every15Seconds.toJSON()
</script>

<style>
  h4 {
    margin-bottom: 0;
  }
</style>

<h4>{$activeSession.course.name}</h4>
<p>Lesson {$activeSession.order}, Started {formatDate(new Date($activeSession.startsAt), { addSuffix: true })}</p>

{#if classIsOver}
  <p>This class was scheduled to end {formatDate(new Date($activeSession.endsAt))}.</p>
  <button on:click={exit}>Exit class</button>
{/if}

<ActiveTeacherSession/>