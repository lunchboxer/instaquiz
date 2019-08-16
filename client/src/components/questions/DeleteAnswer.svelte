<script>
  import { notifications } from '../notifications'
  import { question } from './data'

  export let id
  export let questionId

  const remove = async () => {
    try {
      await question.deleteAnswer(id)
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