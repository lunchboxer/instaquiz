<script>
  import { formatRelative } from 'date-fns'
  import { activeSession, every15Seconds, nowSession } from '../../data/stores'
  import { onMount } from 'svelte'
  import { ws } from '../../data/ws-client'
  import { QUESTION_SUB } from '../../data/queries'
  import StudentQuestionCard from './StudentQuestionCard.svelte'

  let newQuestion
  let answered = ''

  onMount(() => {
    const subscription = ws.request({
      query: QUESTION_SUB,
      variables: { sessionId: $nowSession.id }
    })
      .subscribe({
        next ({ data }) {
          if (data) {
            newQuestion = data.questions
            answered = ''
          }
        }
      })
    return () => subscription && subscription.unsubscribe()
  })

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

{#if newQuestion}
  <StudentQuestionCard question={newQuestion} bind:answered />
{:else}
  <p>Waiting for questions...</p>
{/if}