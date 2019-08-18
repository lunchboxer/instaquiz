<script>
  import Modal from './Modal.svelte'
  import { createEventDispatcher } from 'svelte'
  import { notifications } from './notifications'
  import Error from './Error.svelte'

  export let open = false
  export let errors = ''
  export let loading = false
  let form
  export let heading = 'Edit or add item'

  const dispatch = createEventDispatcher()

  const handleReset = () => {
    errors = ''
    open = false
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
    dispatch('submit')
  }
</script>

<Modal bind:open>
  {#if open}

      <h1>{heading}</h1>

      <form novalidate bind:this={form} on:submit|preventDefault={handleSubmit} on:reset={handleReset} >
        <Error {errors}/>
        <slot></slot>

        <div class="buttons">
          <input type="reset" class="button button-outline" value="Cancel">
          <button type="submit" disabled={loading} class:is-loading={loading}>
              Save
          </button>
        </div>
      </form>
    {/if}
</Modal>