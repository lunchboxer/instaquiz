import { writable } from 'svelte/store'
import { request } from '../../data/fetch-client'
import { COURSE } from '../../data/queries'
import { CREATE_COURSE, DELETE_COURSE, ADD_STUDENT_TO_COURSE } from '../../data/mutations'
import { terms } from '../terms/data'
import { user } from '../../data/user'

const createCoursesStore = () => {
  const { subscribe, set, update } = writable()

  return {
    subscribe,
    update,
    set,
    get: async (id) => {
      const response = await request(COURSE, { id })
      update(previous => previous && previous.map(course => {
        if (course.id === id) return response.course
        return course
      }))
    },
    create: async (input) => {
      const response = await request(CREATE_COURSE, { ...input })
      update(courses => !courses ? [response.createCourse] : [response.createCourse, ...courses])
      terms.update(previous => {
        if (!previous) return
        const index = previous.findIndex(t => t.id === response.createCourse.term.id)
        previous[index].courses.push(response.createCourse)
        return previous
      })
    },
    remove: async (id) => {
      await request(DELETE_COURSE, { id })
      update(previous => previous && previous.filter(course => course.id !== id))
      terms.update(previous => previous && previous.map(term => {
        if (term.courses.findIndex(course => course.id === id) === -1) return term
        return { term, courses: term.courses.filter(c => c.id !== id) }
      }))
    },
    addStudent: async (id, code) => {
      const { addStudentToCourse } = await request(ADD_STUDENT_TO_COURSE,
        { id, code }
      )
      update(previous => !previous ? [addStudentToCourse] : previous.map(course => {
        if (course.id !== addStudentToCourse.id) return course
        return { ...course, students: addStudentToCourse.teachers }
      }))
      user.update(previous => {
        const added = { id: addStudentToCourse.id, name: addStudentToCourse.name }
        return { ...previous, coursesAttending: [...previous.coursesAttending, added] }
      })
      return addStudentToCourse
    }
  }
}

export const courses = createCoursesStore()
