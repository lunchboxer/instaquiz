import { readable, writable } from 'svelte/store'
import { request } from '../../data/fetch-client'
import { GET_MY_SESSIONS } from '../../data/queries'

export function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const nowSession = writable()
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
    get: async (id, now, latest) => {
      if (!id || !now || !latest) return
      const response = await request(GET_MY_SESSIONS, { id, now, latest })
      if (response && response.sessions) set(response.sessions)
    },
    patch: (newSession, id, now, latest) => {
      if (!newSession.course.teachers.find(t => t.id === id)) return
      if (newSession.endsAt > now && newSession.endsAt < latest) {
        update(previous => {
          return [...previous, newSession].sort((a, b) => {
            a.startsAt.localeCompare(b.startsAt)
          })
        })
      }
    }
  }
}

export const sessions = createSessionsStore()
