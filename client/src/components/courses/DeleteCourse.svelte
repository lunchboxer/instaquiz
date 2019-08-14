<script>
  import { createEventDispatcher } from 'svelte'
  import { notifications } from '../notifications'
  import { mutate } from 'svelte-apollo'
  import { client } from '../../data/apollo'
  import { DELETE_COURSE } from '../../data/mutations'
  import { TERMS_AND_ALL } from '../../data/queries'
  import { courses } from './data'

  export let course
  const loading = false

  const dispatch = createEventDispatcher()

  const remove = async () => {
    try {
      await courses.remove(course.id)
      notifications.add({ text: 'Course delete successfully', type: 'success' })
      dispatch('delete')
    } catch (error) {
      console.error(error)
      notifications.add({ text: 'Course could not be deleted', type: 'danger' })
    }
  }
</script>

<style>
  button i {
    margin-right: 0.5rem;
  }
</style>

<button class="button" class:is_loading={loading} on:click={remove}><i class="fas fa-trash"></i>Delete Course</button>