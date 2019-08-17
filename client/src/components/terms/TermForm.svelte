<script>
  import { createEventDispatcher } from 'svelte'
  import { notifications } from '../notifications'
  import Input from '../Input.svelte'
  import Error from '../Error.svelte'

  let saveButton
  let form
  export let name = ''
  export let startDate = ''
  export let endDate = ''
  export let edit = false
  export let errors
  export let loading

  const dispatch = createEventDispatcher()

  $: if (saveButton) { saveButton.disabled = loading }

  const handleSubmit = () => {
    const isValid = form.checkValidity()
    if (!isValid) {
      notifications.add({
        text: 'Please fix form errors first.',
        type: 'danger'
      })
      return
    }
    dispatch('submit', { name, startDate, endDate })
  }
</script>

<style>
  .buttons {
    padding-top: 1rem;
  }

  form {
    max-width: 308px;
  }
</style>

<h1>{#if edit}Edit{:else}Create{/if} semester</h1>

<form novalidate bind:this={form} on:submit|preventDefault={handleSubmit} on:reset >
  <Error {errors}/>
  <Input bind:value={name} label="Name" placeholder="i.e. 'Autumn 1978'" required />
  
  <Input bind:value={startDate} type="date" label="Start date" required />
  <Input bind:value={endDate} type="date" label="End date" required />

  <div class="buttons">
    <input type="reset" class="button button-outline" value="Cancel">
    <button type="submit" class:is-loading={loading} bind:this={saveButton}>Save term</button>
  </div>
</form>