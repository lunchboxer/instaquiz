<script>
  import { mutate } from 'svelte-apollo'
  import { client } from '../../data/apollo'
  import { DELETE_ANSWER } from '../../data/mutations'
  import { QUESTION } from '../../data/queries'
  import { notifications } from '../notifications'

  export let id
  export let questionId

  const remove = async () => {
    try {
      await mutate(client, {
        mutation: DELETE_ANSWER,
        variables: { id },
        refetchQueries: [{ query: QUESTION, variables: { id: questionId } }]
      })
      notifications.add({ text: `Deleted answer`, type: 'success' })
    } catch (error) {
      notifications.add({
        text: 'Could not delete answer.',
        type: 'danger'
      })
    }
  }
</script>

<button class="delete" on:click={remove}></button>