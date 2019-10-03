<script>
  import QuestionResults from '../questions/QuestionResults.svelte'
  import { responses } from '../dashboard/stores'

  export let question

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