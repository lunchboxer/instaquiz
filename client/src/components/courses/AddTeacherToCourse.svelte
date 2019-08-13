<script>
  import { mutate } from 'svelte-apollo'
  import { client } from '../../data/apollo'
  import { notifications } from '../notifications'
  import { ADD_TEACHER_TO_COURSE } from '../../data/mutations'

  export let user
  export let course
  let loading = false

  const joinCourse = async () => {
    loading = true
    try {
      const response = await mutate(client, {
        mutation: ADD_TEACHER_TO_COURSE,
        variables: { id: user, courseId: course.id }
      })
      notifications.add({ text: `Successfully added teacher to ${response.data.addTeacherToCourse.name}`, type: 'success' })
    } catch (error) {
      console.error(error)
      notifications.add({ text: 'Failed to add teacher to course', type: 'danger' })
    } finally {
      loading = false
    }
  }
</script>

<style>
  button i {
    margin-right: 0.5rem;
  }
</style>

<button class="button is-small" class:is-loading={loading} on:click={joinCourse}><i
    class="fas fa-user-plus"></i>Join</button>