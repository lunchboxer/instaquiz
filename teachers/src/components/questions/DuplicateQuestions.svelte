<script>
  import { onMount } from 'svelte'
  import { request } from '../../data/fetch-client'
  import { DUPLICATE_QUESTIONS } from '../../data/queries'
  import Loading from '../Loading.svelte'
  import Input from '../Input.svelte'

  let questions
  let searchString = ''

  onMount(async () => {
    const response = await request(DUPLICATE_QUESTIONS)
    questions = response.duplicateQuestions
  })

  $: filteredQuestions = questions && questions.filter(q => {
    return q.text.toUpperCase().includes(searchString.toUpperCase())
  })
</script>

<h1>Duplicate Questions</h1>
{#if questions}
  {#if questions.length > 0}
    <Input type="text" bind:value={searchString} label="Search" />
    {#each filteredQuestions as question}
      <li>
        <a href="#/duplicate-question/{encodeURI(question.text)}">
          {question.text} &times;{question.count}
        </a>
      </li>
    {/each}
  {:else}
    <p>No duplicate questions found.</p>
  {/if}
{:else}
  <Loading what="duplicate questions" />
{/if}