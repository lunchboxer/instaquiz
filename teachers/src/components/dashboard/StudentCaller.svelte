<script>
  import { request } from '../../data/fetch-client'
  import { CALL_STUDENT, EVALUATE_STUDENT } from '../../data/mutations'
  import { activeSession } from './stores'
  import Error from '../Error.svelte'
  import { notifications } from '../notifications'

  let loading = false
  let errors = ''
  let called

  const callStudent = async () => {
    loading = true
    try {
      const response = await request(CALL_STUDENT, { sessionId: $activeSession.id })
      called = response.callStudent
      errors = ''
    } catch (error) {
      errors = error
    } finally {
      loading = false
    }
  }

  const evaluate = async rating => {
    try {
      const response = await request(EVALUATE_STUDENT, { callId: called.id, evaluation: rating })
      notifications.add({ text: `${response.evaluateStudent.student.name} marked as ${rating}.`, type: 'success' })
      called = null
    } catch (error) {
      errors = error
    }
  }
</script>

<Error {errors} />

<button class:is-loading={loading} on:click={callStudent}>Call on a student</button>

{#if called}
  <p>Called on {called.student.name} ({called.student.username})</p>
  <button on:click={() => evaluate('Fail') }>Fail</button>
  <button on:click={() => evaluate('OK') }>OK</button>
  <button on:click={() => evaluate('Good') }>Good</button>
{/if}