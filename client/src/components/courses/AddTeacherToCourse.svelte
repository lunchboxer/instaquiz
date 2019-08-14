<script>
  import { request } from '../../data/fetch-client'
  import { notifications } from '../notifications'
  import { ADD_TEACHER_TO_COURSE } from '../../data/mutations'
  import { courses, course } from './data'
  import { terms } from '../terms/data'

  export let user
  let loading = false

  const joinCourse = async () => {
    loading = true
    try {
      const { addTeacherToCourse } = await request(ADD_TEACHER_TO_COURSE, { id: user, courseId: $course.id })
      courses.update(previous => !previous ? [addTeacherToCourse] : previous.map((course) => {
        if (course.id !== addTeacherToCourse.id) return course
        return addTeacherToCourse
      }))
      terms.update(previous => previous && previous.map(term => {
        const index = term.courses.findIndex(c => c.id === addTeacherToCourse.id)
        if (index === -1) return term
        return {
          ...term,
          courses: term.courses.map(course => {
            if (course.id === addTeacherToCourse.id) return course
            return addTeacherToCourse
          })
        }
      }))
      course.update(previous => {
        return { ...previous, teachers: addTeacherToCourse.teachers }
      })
      notifications.add({ text: `Successfully added teacher to ${addTeacherToCourse.name}`, type: 'success' })
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