<script>
  import { mutate } from 'svelte-apollo'
  import { client } from '../../data/apollo'
  import { DELETE_QUESTION } from '../../data/mutations'
  import { SESSION } from '../../data/queries'
  import { notifications } from '../notifications'
  import { push } from 'svelte-spa-router'

  export let id
  export let next = null
  export let sessionId

  const remove = async () => {
    try {
      await mutate(client, {
        mutation: DELETE_QUESTION,
        variables: { id },
        refetchQueries: [{ query: SESSION, variables: { id: sessionId } }]
      })
      notifications.add({ text: `Deleted question`, type: 'success' })
      push(next || `/session/${sessionId}`)
    } catch (error) {
      notifications.add({
        text: 'Could not delete question.',
        type: 'danger'
      })
    }
  }
</script>

<button class="button" on:click={remove}>
  <i class="fas fa-trash"></i>
  Delete Question
</button>