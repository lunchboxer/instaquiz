<script>
  import { onMount } from 'svelte'
  import { request } from '../../data/fetch-client'
  import { nowSession } from './stores'
  import { ACTIVE_TEACHER_SESSION } from '../../data/queries'
  import Error from '../Error.svelte'
  import Loading from '../Loading.svelte'
  import TeachersQuestions from './TeachersQuestions.svelte'

  let errors = ''

  onMount(async () => {
    try {
      const { session } = await request(ACTIVE_TEACHER_SESSION, { id: $nowSession.id })
      nowSession.update(previous => {
        return { ...previous, ...session }
      })
    } catch (error) {
      errors = error
    }
  })
</script>

<Error {errors} />

{#if $nowSession.questions}
  <TeachersQuestions questions={$nowSession.questions} />
{:else}
  <Loading what="Session data and questions" />
{/if}