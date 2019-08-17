<script>
  import { formatRelative } from 'date-fns'
  import { user } from '../../data/user'
  import { nowSession, every15Seconds } from './stores'
  import ActiveTeacherSession from './ActiveTeacherSession.svelte'
  import ActiveStudentSession from './ActiveStudentSession.svelte'

  const formatDate = (date) => {
    const string = formatRelative(new Date(date), new Date())
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const exit = () => {
    nowSession.set()
  }
  $: classIsOver = $nowSession.endsAt < $every15Seconds.toJSON()
</script>

<h1 class="title">{$nowSession.course.name}</h1>
<p class="subtitle">Lesson {$nowSession.order}</p>

<p>Started {formatDate(new Date($nowSession.startsAt), { addSuffix: true })}</p>

{#if classIsOver}
  <p>This class was scheduled to end {formatDate(new Date($nowSession.endsAt))}.</p>
  <button class="button is-primary" on:click={exit}>Exit class</button>
{/if}

{#if $user.role === 'Teacher'}
  <ActiveTeacherSession/>
{/if}

{#if $user.role === 'Student'}
  <ActiveStudentSession/>
{/if}