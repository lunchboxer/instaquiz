<script>
  import { mutate } from 'svelte-apollo'
  import { client } from '../../data/apollo'
  import { notifications } from '../notifications'
  import Modal from '../Modal.svelte'
  import TermForm from './TermForm.svelte'
  import { CREATE_TERM } from '../../data/mutations'
  import { TERMS_AND_ALL } from '../../data/queries'

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
      await mutate(client, {
        mutation: CREATE_TERM,
        variables: { ...detail },
        update: (cache, { data: { createTerm } }) => {
          const data = cache.readQuery({ query: TERMS_AND_ALL })
          data.terms.push(createTerm)
          cache.writeQuery({ query: TERMS_AND_ALL, data })
        }
      })
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
  button i {
    margin-right: 0.5rem;
  }

  button {
    margin: 1rem 0;
  }
</style>

<button class="button is-primary" on:click={() => { open = true }}><i class="fas fa-plus"></i>Create a term</button>
<Modal bind:open>
  <TermForm on:reset={reset} on:submit={save} {errors} {loading} />
</Modal>