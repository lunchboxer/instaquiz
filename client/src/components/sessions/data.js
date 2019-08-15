import { writable } from 'svelte/store'
import { request } from '../../data/fetch-client'
import { SESSION } from '../../data/queries'
import { CREATE_SESSION, DELETE_SESSION } from '../../data/mutations'

const createSessionStore = () => {
  const { subscribe, set, update } = writable()

  return {
    subscribe,
    update,
    set,
    get: async (id) => {
      const response = await request(SESSION, { id })
      set(response.session)
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

export const session = createSessionStore()
