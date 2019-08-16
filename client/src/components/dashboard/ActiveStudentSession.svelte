<script>
  import { onMount } from 'svelte'
  import { subscribe } from 'svelte-apollo'
  import { client } from '../../data/apollo'
  import { ws } from '../../data/ws-client'
  import { QUESTION_SUB } from '../../data/queries'
  import { nowSession } from './stores'
  import StudentQuestionCard from './StudentQuestionCard.svelte'

  const newQuestions = ws.request({
    query: QUESTION_SUB,
    variables: { sessionId: $nowSession.id }
  })

  $: console.log(newQuestions)
</script>

{#await newQuestions}
  Waiting for questions...
{:then result}
  <StudentQuestionCard question={result.data.questions}/>
{/await}