<script>
  import { activeSession, every15Seconds, nowSession, myResponses } from '../../data/stores'
  import { onMount } from 'svelte'
  import { user } from '../../data/user'
  import { ws } from '../../data/ws-client'
  import { request } from '../../data/fetch-client'
  import { QUESTION_SUB, MY_SESSION_RESPONSES_AND_QUESTIONS } from '../../data/queries'
  import StudentQuestionCard from './StudentQuestionCard.svelte'

  let newQuestion

  onMount(async () => {
    const response = await request(MY_SESSION_RESPONSES_AND_QUESTIONS, {
      studentId: $user.id,
      sessionId: $nowSession.id
    })
    if (response && response.questions && response.questions.length > 0) {
      newQuestion = response.questions[0]
    }
    if (response && response.responses && response.responses.length > 0) {
      myResponses.set(response.responses)
    }
    const subscription = ws.request({
      query: QUESTION_SUB,
      variables: { sessionId: $nowSession.id }
    })
      .subscribe({
        next ({ data }) {
          if (data) {
            newQuestion = data.questions
          }
        }
      })
    return () => subscription && subscription.unsubscribe()
  })

  $: classIsOver = $activeSession.endsAt < $every15Seconds.toJSON()
</script>

<style>
  h4 {
    margin-bottom: 0;
  }
</style>

<h4>{$activeSession.course.name}</h4>

{#if newQuestion}
  <StudentQuestionCard question={newQuestion} />
{:else}
  <p>Waiting for questions...</p>
{/if}