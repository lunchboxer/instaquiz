<script>
  import { notifications } from '../notifications'
  import { courses } from './data'
  import ModalForm from '../ModalForm.svelte'
  import Input from '../Input.svelte'
  import TermSelect from './TermSelect.svelte'

  let errors = ''
  let open = false
  let loading = false
  let name = ''
  let code = ''
  export let termId = ''

  const save = async () => {
    loading = true
    try {
      await courses.create({ name, termId, code })
      notifications.add({ text: `Saved new course '${name}'`, type: 'success' })
      open = false
      errors = ''
    } catch (error) {
      errors = error
      notifications.add({
        text: 'Could not save new course.',
        type: 'danger'
      })
    } finally {
      loading = false
    }
  }
</script>

<button on:click={() => { open = true }}>
  Add a course
</button>

<ModalForm bind:open on:submit={save} {errors} {loading}>
  <Input label="Name" type="text" bind:value={name} required />
  <Input label="Code" type="text" bind:value={code} required />

  <label>Term</label>
  <TermSelect bind:termId />
</ModalForm>