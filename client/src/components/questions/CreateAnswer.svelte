<script>
  import { CREATE_ANSWER } from '../../data/mutations'
  import { notifications } from '../notifications'
  import Error from '../Error.svelte'
  import Input from '../Input.svelte'
  import { question } from './data'
  import { request } from '../../data/fetch-client'

  export let questionId
  let show = false
  let errors = ''
  let loading = false
  let text = ''

  const reset = () => {
    errors = ''
    show = false
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
    loading = false
  }
</script>

{#if !show}
  <button class="button is-primary" on:click={() => { show = true }}>
    <i class="fas fa-plus"></i>Add an answer
  </button>
{:else}
  <Error {errors} />
  <Input label="Text" type="text" bind:value={text} required />
  <button class="button is-primary" class:is-loading={loading} on:click={add}>Save answer</button>
{/if}