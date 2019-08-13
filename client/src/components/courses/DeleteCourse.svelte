<script>
  import { createEventDispatcher } from 'svelte'
  import { notifications } from '../notifications'
  import { mutate } from 'svelte-apollo'
  import { client } from '../../data/apollo'
  import { DELETE_COURSE } from '../../data/mutations'
  import { TERMS_AND_ALL } from '../../data/queries'

  export let course
  const loading = false

  const dispatch = createEventDispatcher()

  const remove = async () => {
    try {
      await mutate(client, {
        mutation: DELETE_COURSE,
        variables: { id: course.id },
        update: (cache, { data: { deleteCourse } }) => {
          const data = cache.readQuery({ query: TERMS_AND_ALL })
          let courseIndex = null
          const termIndex = data.terms.findIndex(t => {
            courseIndex = t.courses.findIndex(c => c.id === course.id)
            return courseIndex > -1
          })
          data.terms[termIndex].courses.splice(courseIndex, 1)
          cache.writeQuery({ query: TERMS_AND_ALL, data })
        }
      })
      notifications.add({ text: 'Course delete successfully', type: 'success' })
      dispatch('delete')
    } catch (error) {
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