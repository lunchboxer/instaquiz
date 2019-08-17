<script>
  import { request } from '../../data/fetch-client'
  import { DELETE_QUESTION } from '../../data/mutations'
  import { session } from '../sessions/data'
  import { notifications } from '../notifications'
  import { push } from 'svelte-spa-router'
  import ConfirmDelete from '../ConfirmDelete.svelte'
  import Modal from '../Modal.svelte'

  export let question
  export let next = null
  let open = false
  let loading = false
  let errors = ''

  const remove = async () => {
    loading = true
    try {
      await request(DELETE_QUESTION, { id: question.id })
      session.update(previous => previous && ({
        ...previous,
        questions: previous.questions.filter(q => q.id !== question.id)
      }))
      errors = ''
      notifications.add({ text: `Deleted question`, type: 'success' })
      push(next || `/session/${question.session.id}`)
    } catch (error) {
      errors = error
      notifications.add({
        text: 'Could not delete question.',
        type: 'danger'
      })
    } finally {
      loading = false
    }
  }
</script>

<button class="button button-outline" on:click={ () => { open = true }}>
  Delete Question
</button>

<Modal bind:open>
  {#if open}
    <ConfirmDelete name='question' on:delete={remove} {errors} {loading} bind:open>
      the question '{question.text}'
    </ConfirmDelete>
    {/if}
  </Modal>