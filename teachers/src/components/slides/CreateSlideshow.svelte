<script>
  import { slideshows } from './data'
  import { notifications } from '../notifications'
  import Error from '../Error.svelte'
  import Input from '../Input.svelte'

  let name = ''
  let errors = ''
  let loading = false
  let form

  const handleSubmit = async () => {
    loading = true
    const isValid = form.checkValidity()
    if (!isValid) {
      notifications.add({
        text: 'Please fix form errors first.',
        type: 'danger'
      })
      loading = false
      return
    }
    try {
      await slideshows.create(name)
      notifications.add({ text: `Created slideshow '${name}'`, type: 'success' })
      name = ''
      errors = ''
    } catch (error) {
      notifications.add({ text: `Could not create slide show '${name}'`, type: 'danger' })
      errors = error
    } finally {
      loading = false
    }
  }
</script>

<form novalidate bind:this={form} on:submit|preventDefault={handleSubmit}>
  <Error {errors} />

  <Input label="Name of slide show" bind:value={name} required />

  <button type="submit" disabled={loading} class:is-loading={loading}>
    Create new slide show
  </button>

</form>