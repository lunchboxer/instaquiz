<script>
  import { formatRelative } from 'date-fns'
  import PieChart from './PieChart.svelte'

  export let question

  const colors = [
    '#7FFF00',
    '#FF0C0C',
    '#0CF2F2',
    '#7F0CF2',
    '#F20C7F',
    '#F2F20C',
    '#0C0CF2',
    '#F27F0C',
    '#0CF27F',
    '#999'
  ]

  $: totalResponses = question.answers && question.answers.reduce((total, answer) => {
    return total + answer.responses.length
  }, 0)

  const percentage = value => (value === 0 || !totalResponses) ? 0
    : (value / totalResponses) * 100

  const formatCount = length => {
    if (!length) return ''
    return `${length} (${Math.round(percentage(length))}%)`
  }

  const formatDate = date => {
    const dateDate = new Date(date)
    return formatRelative(dateDate, new Date())
  }
</script>

<style>
  section {
    display: flex;
    justify-content: center;
    width: 100%;
    flex-wrap: wrap;
  }

  li {
    list-style: none;
    display: flex;
  }

  li .colorlabel {
    margin-right: 1rem;
  }

  li .details {
    margin-left: 0.5rem;
  }

  div.labels-container {
    padding: 5rem;
    display: flex;
    align-items: center;
  }
</style>
<p>{totalResponses} Responses ({formatDate(question.asked)})</p>

{#if question.answers && question.answers.length > 0}
<section class="chart">

<PieChart {colors} data={question.answers.map(a => {
  return { label: a.text, portion: percentage(a.responses.length) / 100 }
})}
  />
  <div class="labels-container">
    <ul class="labels">
    {#each question.answers as answer, index (answer.id)}
      <li>
          <svg xmlns="http://www.w3.org/2000/svg" class="colorlabel" width="24" height="24" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="12" fill={colors[index]} />
          </svg>
        <strong>{answer.text}</strong> 
        <span class="details">
          {formatCount(answer.responses.length)}
        </span>
        </li>
    {/each}
  </ul>
</div>
</section>
  {/if}