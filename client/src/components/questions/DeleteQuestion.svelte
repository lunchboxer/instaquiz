<script>
  import { request } from '../../data/fetch-client'
  import { DELETE_QUESTION } from '../../data/mutations'
  import { session } from '../sessions/data'
  import { notifications } from '../notifications'
  import { push } from 'svelte-spa-router'

  export let id
  export let next = null
  export let sessionId

  const remove = async () => {
    try {
      await request(DELETE_QUESTION, { id })
      session.update(previous => previous && ({
        ...previous,
        questions: previous.questions.filter(q => q.id !== id)
      }))
      notifications.add({ text: `Deleted question`, type: 'success' })
      push(next || `/session/${sessionId}`)
    } catch (error) {
      console.error(error)
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