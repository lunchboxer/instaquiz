<script>
  import { createEventDispatcher } from 'svelte'
  import { notifications } from '../notifications'
  import Input from '../Input.svelte'
  import Error from '../Error.svelte'
  import TermSelect from './TermSelect.svelte'

  const dispatch = createEventDispatcher()

  export let errors
  export let loading = false
  let form
  let saveButton
  export let id = ''
  export let name = ''
  export let code = ''
  export let termId = ''

  const handleSubmit = () => {
    const isValid = form.checkValidity()
    if (!isValid) {
      notifications.add({
        text: 'Please fix form errors first.',
        type: 'danger'
      })
      return
    }
    dispatch('submit', { id, name, termId, code })
  }
</script>

<h2 class="title">{#if id}Edit{:else}Add{/if} a course</h2>
  <Error {errors} />
  <form novalidate bind:this={form} on:submit|preventDefault={handleSubmit} on:reset>
    <Input label="Name" type="text" bind:value={name} required />
    <Input label="Code" type="text" bind:value={code} required />

    <label class="label">
      Term
    </label>
    <TermSelect bind:termId />

    <div class="buttons">
        <button class="button is-primary" class:is-loading={loading} bind:this={saveButton} type="submit">Save</button>
        <input class="button" type="reset" value="Cancel" />
    </div>
   
  </form>