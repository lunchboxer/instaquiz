<script>
  import { terms } from './data'
  import { notifications } from '../notifications'
  import Modal from '../Modal.svelte'
  import TermForm from './TermForm.svelte'

  let loading = false
  let errors = ''
  let open = false

  const reset = () => {
    errors = ''
    open = false
  }

  const save = async ({ detail }) => {
    loading = true
    const end = new Date(detail.endDate).setHours(23, 59, 59, 999)
    const endDate = new Date(end).toJSON()
    const start = new Date(detail.startDate).setHours(0, 0, 0, 1)
    const startDate = new Date(start).toJSON()
    try {
      await terms.create({ name: detail.name, endDate, startDate })
      notifications.add({ text: `Saved new term '${detail.name}'`, type: 'success' })
      reset()
    } catch (error) {
      errors = error
      notifications.add({
        text: 'Could not save new term.',
        type: 'danger'
      })
    } finally {
      loading = false
    }
  }
</script>

<button on:click={() => { open = true }}>
  Create a term
</button>
<Modal bind:open>
  <TermForm on:reset={reset} on:submit={save} {errors} {loading} />
</Modal>