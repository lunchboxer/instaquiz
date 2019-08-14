import { writable } from 'svelte/store'
import { request } from '../../data/fetch-client'
import { COURSES, COURSE } from '../../data/queries'
import { CREATE_COURSE, DELETE_COURSE } from '../../data/mutations'
import { terms } from '../terms/data'

const createCoursesStore = () => {
  const { subscribe, set, update } = writable(null, set => {
    request(COURSES).then(response => set(response.courses))
  })
  return {
    subscribe,
    update,
    get: async () => {
      const response = await request(COURSES)
      set(response.courses)
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
    }
  }
}

export const courses = createCoursesStore()

const createCourseStore = () => {
  const { subscribe, set, update } = writable()

  return {
    subscribe,
    update,
    set,
    get: async (id) => {
      const response = await request(COURSE, { id })
      set(response.course)
    }
    // create: async (input) => {
    //   const response = await request(CREATE_COURSE, { ...input })
    //   update(courses => !courses ? [response.createCourse] : [response.createCourse, ...courses])
    //   terms.update(previous => {
    //     if (!previous) return
    //     const index = previous.findIndex(t => t.id === response.createCourse.term.id)
    //     previous[index].courses.push(response.createCourse)
    //     return previous
    //   })
    // },
    // remove: async (id) => {
    //   await request(DELETE_COURSE, { id })
    //   update(previous => previous && previous.filter(course => course.id !== id))
    //   terms.update(previous => previous && previous.map(term => {
    //     if (term.courses.findIndex(course => course.id === id) === -1) return term
    //     return { term, courses: term.courses.filter(c => c.id !== id) }
    //   }))
    // }
  }
}

export const course = createCourseStore()
