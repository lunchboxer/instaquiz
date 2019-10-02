<script>
  import { onMount } from 'svelte'
  import { fade } from 'svelte/transition'
  import { ws } from '../../data/ws-client'
  import { request } from '../../data/fetch-client'
  import ViewerResponses from './ViewerResponses.svelte'
  import { students } from '../students/data'
  import { responses } from './stores'
  import CallWatcher from './CallWatcher.svelte'
  import { QUESTION_SUBSCRIPTION, ASKED_QUESTION } from '../../data/queries'

  let question
  export let session

  onMount(async () => {
    students.getByCourse(session.course.id)
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

  $: hasntAnswered = $responses && $students.filter(s => {
    return !$responses.find(r => r.student.id === s.id)
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
    font-size: 6rem;
  }

  p {
    margin: 0;
    padding: 0;
  }
</style>

<CallWatcher {session} />

{#if question}

  <div class="container" transition:fade>
    <h1>{question.text}</h1>
    {#if hasntAnswered && hasntAnswered.length > 0}
      <p>{hasntAnswered.length} students have not answered</p>
      {#if hasntAnswered.length < 10}
        {hasntAnswered.map(s => s.name).join(', ')}
      {/if}
    {/if}
    {#if question.publishResponses}
      <ViewerResponses {question} />
    {/if}
  </div>
  
{/if}