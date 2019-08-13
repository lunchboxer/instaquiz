<script>
  import { query } from 'svelte-apollo'
  import { nowSession } from './stores'
  import { client } from '../../data/apollo'
  import { ACTIVE_TEACHER_SESSION } from '../../data/queries'
  import Error from '../Error.svelte'
  import Loading from '../Loading.svelte'
  import TeachersQuestions from './TeachersQuestions.svelte'

  const sessionCache = query(client, {
    query: ACTIVE_TEACHER_SESSION,
    variables: { id: $nowSession.id }
  })
</script>

{#await $sessionCache}
  <Loading what="Session data and questions" />
{:then result}
  {#if result.data.session}
    <TeachersQuestions questions={result.data.session.questions} />
  {/if}
{:catch errors}
  <Error {errors}/>
{/await}