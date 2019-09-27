<script>
  import { onMount } from 'svelte'
  import { ws } from '../../data/ws-client'
  import { request } from '../../data/fetch-client'
  import ViewerResponses from './ViewerResponses.svelte'
  import { QUESTION_SUBSCRIPTION, ASKED_QUESTION } from '../../data/queries'

  let question
  export let session

  onMount(async () => {
    const { questions } = await request(ASKED_QUESTION, { sessionId: session.id })
    if (questions && questions.length > 0) question = questions[0]
    const subscription = ws.request({
      query: QUESTION_SUBSCRIPTION,
      variables: { sessionId: session.id }
    })
      .subscribe({
        next ({ data }) {
          if (data) {
            question = data.questions
          }
        }
      })
    return () => subscription && subscription.unsubscribe()
  })
</script>

<style>
  .container {
    width: 100%;
    height: calc(100vh - 10rem);
    border: 1px solid #222;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
  }

  h1 {
    font-size: 5rem;
  }
</style>

{#if question}
<div class="container">
  <h1>{question.text}</h1>
  {#if question.publishResponses}
    <ViewerResponses {question} />
  {/if}
</div>
  
{/if}