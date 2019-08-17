<script>
  import { notifications } from '../notifications'
  import Error from '../Error.svelte'
  import Input from '../Input.svelte'
  import { question } from './data'

  export let questionId
  let errors = ''
  let loading = false
  let text = ''
  let form

  const reset = () => {
    errors = ''
    text = ''
  }

  const add = async () => {
    loading = true
    try {
      await question.addAnswer(text, questionId)
      notifications.add({ text: `Saved new answer`, type: 'success' })
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
  }

  const handleSubmit = () => {
    const isValid = form.checkValidity()
    if (!isValid) {
      notifications.add({
        text: 'Please fix form errors first.',
        type: 'danger'
      })
      return
    }
    add()
  }
</script>

<Error {errors} />
<form novalidate bind:this={form} on:submit|preventDefault={handleSubmit} on:reset>
  <Input label="Text" type="text" bind:value={text} required />
  <button type="submit" class="button is-primary" class:is-loading={loading}>Add answer</button>
</form>