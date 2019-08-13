<script>
  import { mutate } from 'svelte-apollo'
  import gql from 'graphql-tag'
  import { client } from '../../data/apollo'
  import { CREATE_ANSWER } from '../../data/mutations'
  import { QUESTION } from '../../data/queries'
  import { QuestionFields } from '../../data/fragments'
  import { notifications } from '../notifications'
  import Error from '../Error.svelte'
  import Input from '../Input.svelte'

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
      await mutate(client, {
        mutation: CREATE_ANSWER,
        variables: { text, questionId },
        refetchQueries: [{ query: QUESTION, variables: { id: questionId } }]
      })
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

<style>
  button i {
    margin-right: 0.5rem;
  }
</style>

{#if !show}
  <button class="button is-primary" on:click={() => { show = true }}>
    <i class="fas fa-plus"></i>Add an answer
  </button>
{:else}
  <Error {errors} />
  <Input label="Text" type="text" bind:value={text} required />
  <button class="button is-primary" class:is-loading={loading} on:click={add}>Save answer</button>
{/if}