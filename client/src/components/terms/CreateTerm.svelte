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
    try {
      await terms.create(detail)
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

<style>
  button {
    margin: 1rem 0;
  }
</style>

<button class="button is-primary" on:click={() => { open = true }}><i class="fas fa-plus"></i>Create a term</button>
<Modal bind:open>
  <TermForm on:reset={reset} on:submit={save} {errors} {loading} />
</Modal>