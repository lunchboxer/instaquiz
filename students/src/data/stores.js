import { readable, writable } from 'svelte/store'
import { request } from './fetch-client'
import { GET_MY_SESSIONS, CURRENT_TERM, COURSE } from './queries'
import { ADD_STUDENT_TO_COURSE } from './mutations'
import { user } from './user'

export function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const nowSession = writable()
export const activeSession = writable()
export const imminentSession = writable()
export const currentQuestion = writable()

export const time = readable(new Date(), set => {
  const interval = setInterval(() => {
    set(new Date())
  }, 1000)
  return () => clearInterval(interval)
})

export const everyMinute = readable(new Date(), set => {
  const interval = setInterval(() => {
    set(new Date())
  }, 6e+4)
  return () => clearInterval(interval)
})

export const every15Seconds = readable(new Date(), set => {
  const interval = setInterval(() => {
    set(new Date())
  }, 15000)
  return () => clearInterval(interval)
})

export const every2Hours = readable(new Date(), set => {
  const interval = setInterval(() => {
    set(new Date())
  }, 2 * 3.6e+6)
  return () => clearInterval(interval)
})

const createSessionsStore = () => {
  const { subscribe, set, update } = writable()

  return {
    subscribe,
    update,
    set,
    get: async (id, now, latest) => {
      if (!id || !now || !latest) return
      const response = await request(GET_MY_SESSIONS, { id, now, latest })
      if (response && response.sessions) set(response.sessions)
    }
  }
}

export const sessions = createSessionsStore()

const createTermStore = () => {
  const { subscribe, set, update } = writable()
  return {
    subscribe,
    update,
    get: async () => {
      const response = await request(CURRENT_TERM, { now: new Date().toJSON() })
      if (response.terms.length === 0) {
        set({})
        return
      }
      set(response.terms[0])
      courses.set(response.terms[0].courses)
    }
  }
}

export const term = createTermStore()

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
