import { writable } from 'svelte/store'
import { request } from '../../data/fetch-client'
import { COURSE_STUDENTS, STUDENT } from '../../data/queries'
import { UPDATE_USER, RESET_PASSWORD } from '../../data/mutations'

const createStudentsStore = () => {
  const { subscribe, set, update } = writable()

  return {
    subscribe,
    update,
    set,
    getById: async (id) => {
      const { user } = await request(STUDENT, { id })
      update(previous => {
        if (!previous) return [user]
        const filteredStudents = previous.filter(s => s.id !== id)
        return [...filteredStudents, user]
      })
    },
    getByCourse: async (courseId) => {
      const { course } = await request(COURSE_STUDENTS, { courseId })
      if (course && course.students && course.students.length > 0) {
        set(course.students)
      }
    },
    patch: async (id, input) => {
      const response = await request(UPDATE_USER, { id, input })
      update(previous => previous.map(s => {
        if (s.id === id) return response.updateUser
        return s
      }))
    },
    resetPassword: async (username) => {
      const response = await request(RESET_PASSWORD, { username })
      return response.resetPassword
    }
  }
}

export const students = createStudentsStore()
