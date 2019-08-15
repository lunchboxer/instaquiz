<script>
  import { request } from '../../data/fetch-client'
  import { notifications } from '../notifications'
  import Error from '../Error.svelte'
  import { REMOVE_TEACHER_FROM_COURSE } from '../../data/mutations'
  import { courses } from './data'
  import { me } from '../profile/data'

  export let courseId

  let loading = false
  let errors = ''

  const leaveCourse = async () => {
    loading = true
    try {
      const { removeTeacherFromCourse } = await request(REMOVE_TEACHER_FROM_COURSE,
        { id: $me.id, courseId }
      )
      courses.update(previous => !previous
        ? [removeTeacherFromCourse]
        : previous.map((course) => {
          if (course.id !== removeTeacherFromCourse.id) return course
          return { ...course, teachers: removeTeacherFromCourse.teachers }
        })
      )
      me.update(previous => {
        return {
          ...previous,
          coursesTeaching: previous.coursesTeaching.filter(c => c.id === courseId)
        }
      })
      errors = ''
      notifications.add({ text: `Successfully removed teacher from ${removeTeacherFromCourse.name}`, type: 'success' })
    } catch (error) {
      errors = error
      notifications.add({ text: 'Failed remove teacher from course course', type: 'danger' })
    } finally {
      loading = false
    }
  }
</script>

<button class="button is-small" class:is-loading={loading} on:click={leaveCourse}>
  Leave
</button>
<Error {errors} />