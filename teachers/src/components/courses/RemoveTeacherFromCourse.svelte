<script>
  import { request } from '../../data/fetch-client'
  import { notifications } from '../notifications'
  import Error from '../Error.svelte'
  import { REMOVE_TEACHER_FROM_COURSE } from '../../data/mutations'
  import { courses } from './data'
  import { user } from '../../data/user'

  export let courseId

  let loading = false
  let errors = ''

  const leaveCourse = async () => {
    loading = true
    try {
      const { removeTeacherFromCourse } = await request(REMOVE_TEACHER_FROM_COURSE,
        { id: $user.id, courseId }
      )
      courses.update(previous => !previous
        ? [removeTeacherFromCourse]
        : previous.map((course) => {
          if (course.id !== removeTeacherFromCourse.id) return course
          return { ...course, teachers: removeTeacherFromCourse.teachers }
        })
      )
      user.update(previous => {
        const newUser = {
          ...previous,
          coursesTeaching: previous.coursesTeaching.filter(c => c.id !== courseId)
        }
        user.coldUpdate(newUser)
        return newUser
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

<button class="button button-clear" class:is-loading={loading} on:click={leaveCourse}>
  Leave
</button>
<Error {errors} />