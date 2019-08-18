<script>
  import { terms } from './data'
  import { notifications } from '../notifications'
  import ModalForm from '../ModalForm.svelte'
  import Input from '../Input.svelte'

  let loading = false
  let errors = ''
  let open = false
  let name = ''
  let startDate = ''
  let endDate = ''

  const save = async () => {
    loading = true
    endDate = new Date(endDate + 'T23:59:59.999').toJSON()
    startDate = new Date(startDate + 'T00:00:00.001').toJSON()
    try {
      await terms.create({ name, endDate, startDate })
      notifications.add({ text: `Saved new term '${name}'`, type: 'success' })
      errors = ''
      open = false
    } catch (error) {
      errors = error
      notifications.add({
        text: 'Could not save new term.',
        type: 'danger'
      })
    } finally {
      loading = false
    }
  }
</script>

<button on:click={() => { open = true }}>
  Create a term
</button>

<ModalForm bind:open on:submit={save} {errors} {loading}>
  <Input bind:value={name} label="Name" placeholder="i.e. 'Autumn 1978'" required />
  <Input bind:value={startDate} type="date" label="Start date" required />
  <Input bind:value={endDate} type="date" label="End date" required />
</ModalForm>