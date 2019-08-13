<script>
  import { mutate } from 'svelte-apollo'
  import { client } from '../../data/apollo'
  import { CREATE_QUESTION } from '../../data/mutations'
  import { SESSION } from '../../data/queries'
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
      await mutate(client, {
        mutation: CREATE_QUESTION,
        variables: { text: detail.text, order, sessionId },
        refetchQueries: [{ query: SESSION, variables: { id: sessionId } }]
      })
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

<style>
  button i {
    margin-right: 0.5rem;
  }
</style>

<button class="button is-primary" on:click={() => { open = true }}><i class="fas fa-plus"></i>Add a question</button>

<Modal bind:open>
  <QuestionForm on:reset={reset} on:submit={add} {errors} {loading} />
</Modal>