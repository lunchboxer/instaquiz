<script>
  import { ANSWER_QUESTION } from '../../data/mutations'
  import { request } from '../../data/fetch-client'
  import { user } from '../../data/user'
  import Loading from '../Loading.svelte'
  import Error from '../Error.svelte'
  import { myResponses } from '../../data/stores'

  export let question
  let loading = false
  let errors = ''
  let change = false

  $: latestResponse = $myResponses && $myResponses.find(r => r.question.id === question.id)
  $: answered = latestResponse && latestResponse.answer.text
  const respond = async (answer) => {
    loading = true
    try {
      const response = await request(ANSWER_QUESTION, {
        questionId: question.id,
        answerId: answer.id,
        studentId: $user.id,
        sessionId: question.session.id
      })
      myResponses.update(previous => {
        if (!previous) return [response.answerQuestion]
        const filteredResponses = previous.filter(r => r.question.id !== question.id)
        return [...filteredResponses, response.answerQuestion]
      })
      change = false
    } catch (error) {
      errors = error
    } finally {
      loading = false
    }
  }
</script>

<style>
  section.question {
    width: 100%;
    margin-top: 1rem;
    padding: 1rem;
  }

  button {
    margin: 0.5rem;
  }

  li {
    list-style: none;
  }
</style>

<section class="question">
  <h3> {question.text}</h3>

  <Error {errors} />
  {#if loading}
    <Loading what="response" />
  {:else if answered && change === false}
    <p>You Answered: {answered}</p>

    <button on:click={() => { change = true }}>Change</button>
  {:else}
    <ul>
      {#each question.answers as answer (answer.id)}
        <li>
          <button on:click={() => { respond(answer) }}>{answer.text}</button>
        </li>
      {/each}
    </ul>
  {/if}
</section>