<script>
  import { formatRelative } from 'date-fns'
  import { user } from '../../data/user'
  import { activeSession, every15Seconds } from './stores'
  import ActiveTeacherSession from './ActiveTeacherSession.svelte'
  import ActiveStudentSession from './ActiveStudentSession.svelte'

  const formatDate = (date) => {
    const string = formatRelative(new Date(date), new Date())
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const exit = () => {
    activeSession.set()
  }
  $: classIsOver = $activeSession.endsAt < $every15Seconds.toJSON()
</script>

<h1>{$activeSession.course.name}</h1>
<p>Lesson {$activeSession.order}</p>

<p>Started {formatDate(new Date($activeSession.startsAt), { addSuffix: true })}</p>

{#if classIsOver}
  <p>This class was scheduled to end {formatDate(new Date($activeSession.endsAt))}.</p>
  <button on:click={exit}>Exit class</button>
{/if}

<ActiveTeacherSession/>