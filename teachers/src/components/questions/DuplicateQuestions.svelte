<script>
  import { onMount } from 'svelte'
  import { request } from '../../data/fetch-client'
  import { DUPLICATE_QUESTIONS } from '../../data/queries'
  import Loading from '../Loading.svelte'

  let questions

  onMount(async () => {
    const response = await request(DUPLICATE_QUESTIONS)
    questions = response.duplicateQuestions
  })
</script>

<h1>Duplicate Questions</h1>
{#if questions}
  {#if questions.length > 0}
    {#each questions as question}
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