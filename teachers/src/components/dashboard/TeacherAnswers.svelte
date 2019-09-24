<script>
  import { onMount } from 'svelte'
  import { request } from '../../data/fetch-client'
  import { ws } from '../../data/ws-client'
  import { RESPONSES, RESPONSE_SUBSCRIPTION } from '../../data/queries'
  import TeacherAnswerRow from './TeacherAnswerRow.svelte'

  export let question
  let responses = []

  onMount(async () => {
    const responsesResult = await request(RESPONSES, { questionId: question.id })
    responses = responsesResult.responses
    ws.request({
      query: RESPONSE_SUBSCRIPTION,
      variables: { questionId: question.id }
    }).subscribe({
      next (result) {
        const filteredResponses = responses.filter(r => r.id !== result.data.responses.id)
        responses = [...filteredResponses, result.data.responses]
      }
    })
  })
</script>

<style>
  .answers {
    padding: 1rem;
  }

  .answers p {
    margin-bottom: 1rem;
  }
</style>

<div class="answers">
  <p>{responses.length} responses total:</p>
  {#each question.answers as answer (answer.id)}
      <TeacherAnswerRow 
      {answer} 
      responses={responses.filter(r => r.answer.id === answer.id)}
      totalResponses={responses.length}
      />
    {/each}
</div>