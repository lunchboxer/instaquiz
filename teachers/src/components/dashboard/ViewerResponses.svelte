<script>
  import { onMount } from 'svelte'
  import { ws } from '../../data/ws-client'
  import { request } from '../../data/fetch-client'
  import { RESPONSES, RESPONSE_SUBSCRIPTION } from '../../data/queries'
  import QuestionResults from '../questions/QuestionResults.svelte'

  export let question
  let results = []

  onMount(async () => {
    const { responses } = await request(RESPONSES, { questionId: question.id })
    if (responses && responses.length > 0) {
      results = responses
    }
    const subscription = ws.request({
      query: RESPONSE_SUBSCRIPTION,
      variables: { questionId: question.id }
    })
      .subscribe({
        next (result) {
          const filteredResponses = results.filter(r => r.id !== result.data.responses.id)
          results = [...filteredResponses, result.data.responses]
        }
      })
    return () => subscription && subscription.unsubscribe()
  })

  const mapResultsToAnswers = () => {
    if (!question.answers) return
    return question.answers.map(answer => {
      answer.responses = results.filter(result => result.answer.id === answer.id)
      return answer
    })
  }

  $: if (results && results.length > 0) {
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