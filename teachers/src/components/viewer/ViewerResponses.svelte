<script>
  import { onMount } from 'svelte'
  import { ws } from '../../data/ws-client'
  import { request } from '../../data/fetch-client'
  import { RESPONSES, RESPONSE_SUBSCRIPTION } from '../../data/queries'
  import QuestionResults from '../questions/QuestionResults.svelte'
  import { responses } from '../dashboard/stores'

  export let question

  onMount(async () => {
    const response = await request(RESPONSES, { questionId: question.id })
    if (response.responses && response.responses.length > 0) {
      responses.set(response.responses)
    }
    const subscription = ws.request({
      query: RESPONSE_SUBSCRIPTION,
      variables: { questionId: question.id }
    })
      .subscribe({
        next (result) {
          responses.update(previous => {
            if (!previous) return [result.data.responses]
            const filtered = previous.filter(r => r.id !== result.data.responses.id)
            const newOne = result.data.responses
            return [newOne, ...filtered]
          })
        }
      })
    return () => subscription && subscription.unsubscribe()
  })

  const mapResultsToAnswers = () => {
    if (!question.answers) return
    return question.answers.map(answer => {
      const filteredResponses = $responses.filter(r => r.answer.id === answer.id)
      answer.responses = filteredResponses
      return answer
    })
  }

  $: if ($responses && $responses.length > 0) {
    question.answers = mapResultsToAnswers()
  }
</script>

<style>
  .results {
    width: 100%;
  }
</style>

<section class="results">
  <QuestionResults answers={question.answers} asked={question.asked} />
</section>