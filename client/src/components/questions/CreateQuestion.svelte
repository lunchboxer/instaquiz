<script>
  import { request } from '../../data/fetch-client'
  import { CREATE_QUESTION } from '../../data/mutations'
  import { session } from '../sessions/data'
  import { notifications } from '../notifications'
  import Modal from '../Modal.svelte'
  import QuestionForm from './QuestionForm.svelte'

  export let sessionId
  let open = false
  let errors = ''
  let loading = false

  const reset = () => {
    errors = ''
    open = false
  }

  const add = async ({ detail }) => {
    loading = true
    let order
    detail.order && (order = ((detail.order - 1)))
    try {
      const response = await request(CREATE_QUESTION,
        { text: detail.text, order, sessionId }
      )
      if (detail.order) session.get(sessionId)
      else {
        session.update(previous => previous && ({
          ...previous,
          questions: [...previous.questions, response.createQuestion]
        }))
      }
      notifications.add({ text: `Saved new question`, type: 'success' })
      reset()
    } catch (error) {
      errors = error
      notifications.add({
        text: 'Could not save new question.',
        type: 'danger'
      })
    } finally {
      loading = false
    }
    loading = false
  }
</script>

<button class="button is-primary" on:click={() => { open = true }}><i class="fas fa-plus"></i>Add a question</button>

<Modal bind:open>
  <QuestionForm on:reset={reset} on:submit={add} {errors} {loading} />
</Modal>