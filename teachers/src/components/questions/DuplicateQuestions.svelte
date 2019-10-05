<script>
  import { onMount } from 'svelte'
  import { duplicateQuestions } from './data'
  import Loading from '../Loading.svelte'
  import Input from '../Input.svelte'
  import Error from '../Error.svelte'

  let searchString = ''
  let errors = ''

  onMount(async () => {
    try {
      await duplicateQuestions.get()
    } catch (error) {
      errors = error
    }
  })

  $: filteredQuestions = $duplicateQuestions && $duplicateQuestions.filter(q => {
    return q.text.toUpperCase().includes(searchString.toUpperCase())
  })
</script>

<h1>Duplicate Questions</h1>

<Error {errors} />

{#if $duplicateQuestions}
  {#if $duplicateQuestions.length > 0}
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