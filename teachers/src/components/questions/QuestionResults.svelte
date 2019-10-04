<script>
  import { formatRelative } from 'date-fns'
  import PieChart from './PieChart.svelte'
  import { flip } from 'svelte/animate'
  import { location } from 'svelte-spa-router'
  import { DELETE_RESPONSE } from '../../data/mutations'
  import { request } from '../../data/fetch-client'
  import { notifications } from '../notifications'

  export let answers
  export let asked = ''

  const colors = [
    '#7FFF00',
    '#0CF2F2',
    '#F20C7F',
    '#7F0CF2',
    '#FF0C0C',
    '#F2F20C',
    '#0C0CF2',
    '#F27F0C',
    '#0CF27F',
    '#999'
  ]
  $: totalResponses = answers && answers.reduce((total, answer) => {
    if (!answer.responses) return total
    return total + answer.responses.length
  }, 0)

  $: sortedAnswers = answers && answers.map(a => {
    if (!a.responses) a.responses = []
    return a
  }).sort((a, b) => {
    const bnum = b.responses ? b.responses.length : 0
    const anum = a.responses ? a.responses.length : 0
    return bnum - anum
  })

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

  const findDuplicateResponses = () => {
    const allResponses = answers.flatMap(a => a.responses)
    // the most straight-forward and least efficient way
    // compare every result to every other result
    const duplicates = []
    const groupedByStudent = {}
    allResponses.forEach(response => {
      if (!groupedByStudent[response.student.id]) {
        groupedByStudent[response.student.id] = [response]
      } else {
        groupedByStudent[response.student.id].push(response)
      }
    })
    for (const studentId in groupedByStudent) {
      if (groupedByStudent[studentId].length > 1) {
        duplicates.push(groupedByStudent[studentId].sort((a, b) => {
          return b.createdAt.localeCompare(a.createdAt)
        }))
      }
    }
    return duplicates
  }

  $: duplicateResponses = answers && findDuplicateResponses()

  const remove = async id => {
    try {
      await request(DELETE_RESPONSE, { id })
      notifications.add({ text: `removed response ${id}`, type: 'success' })
    } catch (error) {
      notifications.add({ text: `could not remove response ${id}`, type: 'danger' })
      console.error(error)
    }
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

  ul {
    padding: 0;
    margin: 0;
  }

  div.labels-container {
    padding: 5rem;
    display: flex;
    align-items: center;
  }

  @media only screen and (max-width: 600px) {
    div.labels-container {
      padding: 1rem;
    }
  }
</style>

{#if answers && answers.length > 0}
<section class="chart" class:viewer={$location === '/viewer'}>

<PieChart {colors} data={sortedAnswers.map(a => {
  if (!a.responses) return { label: a.text, portion: 0 }
  return { label: a.text, portion: percentage(a.responses.length) / 100 }
})}
  />
  <div class="labels-container">
    <ul class="labels">
      <li>{totalResponses} Responses {#if $location !== '/viewer' && asked}({formatDate(asked)}){/if}</li>
    {#each sortedAnswers as answer, index (answer.id)}
      <li animate:flip>
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

{#if duplicateResponses && duplicateResponses.length > 0}
  <h3>Duplicate reponses</h3>
  {#each duplicateResponses as dupe}
    <li>{dupe.length} similar responses</li>
    <ul>
      {#each dupe as response, index (response.id)}
        <li>
          {response.id} - {new Date(response.createdAt).toLocaleString()}, student:{response.student.id}, session: {response.session.id}
          {#if index !== 0}
            <button class="button-clear" on:click={() => remove(response.id)}>delete</button>
          {/if}
        </li>
      {/each}
    </ul>
  {/each}
{/if}

{/if}