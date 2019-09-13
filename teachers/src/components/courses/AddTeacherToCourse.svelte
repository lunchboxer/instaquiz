<script>
  import { request } from '../../data/fetch-client'
  import { notifications } from '../notifications'
  import { ADD_TEACHER_TO_COURSE } from '../../data/mutations'
  import { courses } from './data'
  import { user } from '../../data/user'

  let loading = false
  export let courseId

  const joinCourse = async () => {
    loading = true
    try {
      const course = await courses.addTeacher($user.id, courseId)
      notifications.add({ text: `Successfully added teacher to ${course.name}`, type: 'success' })
    } catch (error) {
      notifications.add({ text: 'Failed to add teacher to course', type: 'danger' })
    } finally {
      loading = false
    }
  }
</script>

<button class="button button-clear" class:is-loading={loading} on:click={joinCourse}>
  Join
</button>