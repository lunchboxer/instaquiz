<script>
  import { createEventDispatcher } from 'svelte'
  import { notifications } from '../notifications'
  import Input from '../Input.svelte'
  import Error from '../Error.svelte'

  const dispatch = createEventDispatcher()

  export let errors
  export let loading = false
  let form
  let saveButton
  export let id = ''
  export let text = ''
  export let order = null

  const handleSubmit = () => {
    const isValid = form.checkValidity()
    if (!isValid) {
      notifications.add({
        text: 'Please fix form errors first.',
        type: 'danger'
      })
      return
    }
    dispatch('submit', { id, text, order })
  }
</script>

<h2 class="title">{#if id}Edit{:else}Add{/if} a Question</h2>
    <Error {errors} />
    <form novalidate bind:this={form} on:submit|preventDefault={handleSubmit} on:reset>
      <Input label="Text" type="text" bind:value={text} required />
      <Input label="Order (optional)" type="number" bind:value={order} min=1 />
  
      <div class="buttons">
          <button class="button is-primary" class:is-loading={loading} bind:this={saveButton} type="submit">Save</button>
          <input class="button" type="reset" value="Cancel" />
      </div>
     
    </form>