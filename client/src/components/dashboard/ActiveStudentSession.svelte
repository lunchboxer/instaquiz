<script>
  import { onMount } from 'svelte'
  import { ws } from '../../data/ws-client'
  import { QUESTION_SUB } from '../../data/queries'
  import { nowSession } from './stores'
  import StudentQuestionCard from './StudentQuestionCard.svelte'

  let newQuestion
  let answered = ''

  onMount(() => {
    const subscription = ws.request({
      query: QUESTION_SUB,
      variables: { sessionId: $nowSession.id }
    })
      .subscribe({
        next({ data }) {
          if (data) {
            newQuestion = data.questions
            answered = ''
          }
        }
      })
    return () => subscription && subscription.unsubscribe()
  })
</script>

{#if newQuestion}
  <StudentQuestionCard question={newQuestion} bind:answered />
{:else}
  <p>Waiting for questions...</p>
{/if}