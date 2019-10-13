<script>
  import { request } from '../../data/fetch-client'
  import { SESSION_QUESTIONS } from '../../data/queries'
  import ImportSingleQuestionRow from './ImportSingleQuestionRow.svelte'

  export let sessionId

  let questions

  const showQuestions = async () => {
    try {
      const response = await request(SESSION_QUESTIONS, { sessionId })
      questions = response.questions
    } catch (error) {
      console.error(error)
    }
  }
</script>

{#if questions}
<button class="button-outline" on:click={() => { questions = null }}>Hide questions</button>

  <section>
    {#each questions as question (question.id)}
      <ImportSingleQuestionRow {question} />
    {/each}
  </section>

{:else}
  <button on:click={showQuestions}>Show questions</button>
{/if}