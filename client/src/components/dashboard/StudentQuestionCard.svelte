<script>
  import { ANSWER_QUESTION } from '../../data/mutations'
  import { request } from '../../data/fetch-client'
  import { user } from '../../data/user'
  import Loading from '../Loading.svelte'
  import Error from '../Error.svelte'

  export let question
  export let answered = ''
  let loading = false
  let errors = ''

  const respond = async (answer) => {
    loading = true
    try {
      request(ANSWER_QUESTION, {
        questionId: question.id,
        answerId: answer.id,
        studentId: $user.id,
        sessionId: question.session.id
      })
      answered = answer.text
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
  <h2 class="title"> {question.text}</h2>

  <Error {errors} />
  {#if loading}
    <Loading what="response" />
  {:else if answered}
    <p>You Answered: {answered}</p>
  {:else}
    <ul>
      {#each question.answers as answer (answer.id)}
        <li>
          <button class="button is-primary" on:click={() => { respond(answer) }}>{answer.text}</button>
        </li>
      {/each}
    </ul>
  {/if}
</section>