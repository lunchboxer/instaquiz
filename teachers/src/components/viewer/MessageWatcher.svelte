<script>
  import { onMount } from 'svelte'
  import { ws } from '../../data/ws-client'
  import { MESSAGE_SUBSCRIPTION } from '../../data/queries'
  import Timer from './widgets/Timer.svelte'

  export let session

  let message
  let seconds = 0

  onMount(async () => {
    const subscription = ws.request({
      query: MESSAGE_SUBSCRIPTION,
      variables: { sessionId: session.id }
    })
      .subscribe({
        next ({ data }) {
          if (data && data.messages) {
            message = { ...data.messages, body: JSON.parse(data.messages.body) }
            if (data.messages.label === 'timer') {
              seconds = message.body.seconds
            }
          }
        }
      })
    return () => subscription && subscription.unsubscribe()
  })
</script>

{#if seconds > 0}
  <Timer bind:seconds />
{/if}