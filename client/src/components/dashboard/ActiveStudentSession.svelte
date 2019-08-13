<script>
  import { subscribe } from 'svelte-apollo'
  import { client } from '../../data/apollo'
  import { QUESTION_SUB } from '../../data/queries'
  import { nowSession } from './stores'
  import StudentQuestionCard from './StudentQuestionCard.svelte'

  const newQuestions = subscribe(client, {
    query: QUESTION_SUB,
    variables: { sessionId: $nowSession.id }
  })
</script>

{#await $newQuestions}
  Waiting for questions...
{:then result}
  <StudentQuestionCard question={result.data.questions}/>
{/await}