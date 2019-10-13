<script>
  import { onMount } from 'svelte'
  import { request } from '../../data/fetch-client'
  import { activeSession } from './stores'
  import { ACTIVE_TEACHER_SESSION } from '../../data/queries'
  import Error from '../Error.svelte'
  import Loading from '../Loading.svelte'
  import TeachersQuestions from './TeachersQuestions.svelte'
  import StudentCaller from './StudentCaller.svelte'
  import SetTimer from './SetTimer.svelte'
  import Absences from './Absences.svelte'

  let errors = ''

  onMount(async () => {
    try {
      const { session } = await request(ACTIVE_TEACHER_SESSION, { id: $activeSession.id })
      activeSession.update(previous => {
        return { ...previous, ...session }
      })
    } catch (error) {
      errors = error
    }
  })
</script>

<Error {errors} />

<Absences sessionId={$activeSession.id} />

<StudentCaller />
{#if $activeSession.questions}
  <TeachersQuestions questions={$activeSession.questions} />
{:else}
  <Loading what="Session data and questions" />
{/if}

<SetTimer />