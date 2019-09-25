<script>
  import { formatRelative } from 'date-fns'

  export let question

  $: totalResponses = question.answers && question.answers.reduce((total, answer) => {
    return total + answer.responses.length
  }, 0)

  const formatCount = length => {
    if (!length) return ''
    const percentage = length === 0 || !totalResponses ? 0
      : parseInt((length / totalResponses) * 100)
    return `${length} (${percentage}%)`
  }

  const formatDate = date => {
    const dateDate = new Date(date)
    return formatRelative(dateDate, new Date())
  }
</script>

<h3>{totalResponses} Responses</h3>

<p>Asked {formatDate(question.asked)}</p>

{#if question.answers && question.answers.length > 0}
  {#each question.answers as answer (answer.id)}
    <li><strong>{answer.text}</strong> {formatCount(answer.responses.length)}</li>
  {/each}
{/if}