<script>
  import { request } from '../../data/fetch-client'
  import { SEND_MESSAGE } from '../../data/mutations'
  import { activeSession } from './stores'
  import { notifications } from '../notifications'
  import Error from '../Error.svelte'
  import Input from '../Input.svelte'

  let seconds = 300
  let errors = ''
  let loading = false

  const setTimer = async () => {
    loading = true
    try {
      const body = JSON.stringify({ seconds })
      await request(SEND_MESSAGE, { sessionId: $activeSession.id, label: 'timer', body })
      notifications.add({ text: `Set timer for ${seconds} seconds`, type: 'success' })
    } catch (error) {
      errors = error
      notifications.add({ text: 'Set timer failed', type: 'danger' })
    } finally {
      loading = false
    }
  }
</script>

<Error {errors} />
<Input type="number" label="seconds" bind:value={seconds} />
<button class:is-loading={loading} disabled={loading} on:click={setTimer}>Set timer</button>