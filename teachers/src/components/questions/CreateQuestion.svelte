<script>
  import { push } from 'svelte-spa-router'
  import { request } from '../../data/fetch-client'
  import { CREATE_QUESTION } from '../../data/mutations'
  import { session, questions } from '../sessions/data'
  import { notifications } from '../notifications'
  import Input from '../Input.svelte'
  import Error from '../Error.svelte'

  export let sessionId
  let errors = ''
  let loading = false
  let form
  let saveButton
  export let text = ''
  export let order = null

  const reset = () => {
    errors = ''
    text = ''
    order = null
  }

  const add = async () => {
    loading = true
    order && order--
    try {
      const response = await request(CREATE_QUESTION,
        { input: { text, order, session: { connect: { id: sessionId } } } }
      )
      if (order !== null) session.get(sessionId)
      else {
        session.update(previous => {
          const questionList = [...previous.questions, response.createQuestion]
            .slice(0).sort((a, b) => {
              return a.order - b.order
            })
          questions.set(questionList)
          return { ...previous, questions: questionList }
        })
      }
      notifications.add({ text: 'Saved new question', type: 'success' })
      reset()
      push(`/question/${response.createQuestion.id}`)
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

<h2>Add a Question</h2>

<Error {errors} />

<form novalidate bind:this={form} on:submit|preventDefault={handleSubmit} on:reset>

  <Input label="Text" type="text" bind:value={text} required />
  <Input label="Order (optional)" type="number" bind:value={order} min=1 />

  <input class="button button-outline" type="reset" value="Cancel" />
  <button class:is-loading={loading} bind:this={saveButton} type="submit">Save</button>

</form>