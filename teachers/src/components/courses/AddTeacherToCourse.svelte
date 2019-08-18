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
      const { addTeacherToCourse } = await request(ADD_TEACHER_TO_COURSE, {
        id: $user.id, courseId
      })
      courses.update(previous => !previous
        ? [addTeacherToCourse]
        : previous.map((course) => {
          if (course.id !== addTeacherToCourse.id) return course
          return { ...course, teachers: addTeacherToCourse.teachers }
        })
      )
      user.update(previous => {
        const added = { id: courseId, name: addTeacherToCourse.name }
        return { ...previous, coursesTeaching: [...previous.coursesTeaching, added] }
      })
      notifications.add({ text: `Successfully added teacher to ${addTeacherToCourse.name}`, type: 'success' })
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