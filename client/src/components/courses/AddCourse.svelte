<script>
  import Modal from '../Modal.svelte'
  import CourseForm from './CourseForm.svelte'
  import { notifications } from '../notifications'
  import { courses } from './data'

  let errors = ''
  let open = false
  let loading = false
  export let termId = ''

  const reset = () => {
    errors = ''
    open = false
  }

  const save = async ({ detail }) => {
    loading = true
    try {
      await courses.create(detail)
      notifications.add({ text: `Saved new course '${detail.name}'`, type: 'success' })
      reset()
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

<style>
  button {
    margin: 1rem 0;
  }
</style>

<button class="button" on:click={()=> { open = true }}>
  <i class="fas fa-plus"></i>Add a course
</button>
<Modal bind:open>
  <CourseForm on:reset={reset} on:submit={save} {errors} {termId} {loading} />
</Modal>