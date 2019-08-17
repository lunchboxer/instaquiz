<script>
  import { format } from 'date-fns'
  import { createEventDispatcher } from 'svelte'
  import { notifications } from '../notifications'
  import Input from '../Input.svelte'
  import Error from '../Error.svelte'

  let saveButton
  let form
  export let session = {}
  export let startsAt = ''
  export let endsAt = ''
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
    dispatch('submit', { startsAt, endsAt })
  }
</script>


<h1>{#if session.id}Edit{:else}Create{/if} Session</h1>
  
  <form novalidate bind:this={form} on:submit|preventDefault={handleSubmit} on:reset >
    <Error {errors}/>
    <Input label="Start time" type="datetime-local" bind:value={startsAt} required min={format(new Date(), "yyyy-MM-dd'T'HH:mm")} />
    <Input label="End time" type="datetime-local" bind:value={endsAt} required min={format(new Date(), "yyyy-MM-dd'T'HH:mm")} />
    <div class="buttons">
      <input type="reset" class="button button-outline" value="Cancel">
      <button type="submit" class:is-loading={loading} bind:this={saveButton}>Save session</button>
    </div>
  </form>