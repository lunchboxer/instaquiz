<script>
  import { onMount } from 'svelte'
  import { client } from '../../data/apollo'
  import { RESPONSES, RESPONSE_SUBSCRIPTION } from '../../data/queries'
  import TeacherAnswerRow from './TeacherAnswerRow.svelte'

  export let question
  let responses = []

  onMount(async () => {
    const responsesResult = await client.query({
      query: RESPONSES,
      variables: { questionId: question.id }
    })
    responses = responsesResult.data.responses
    client.subscribe({
      query: RESPONSE_SUBSCRIPTION,
      variables: { questionId: question.id }
    }).subscribe({
      next (result) {
        responses = [...responses, result.data.responses]
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