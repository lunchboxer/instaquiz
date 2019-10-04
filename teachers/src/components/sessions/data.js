import { writable } from 'svelte/store'
import { request } from '../../data/fetch-client'
import { SESSION } from '../../data/queries'

const createSessionStore = () => {
  const { subscribe, set, update } = writable()

  return {
    subscribe,
    update,
    set,
    get: async (id) => {
      const response = await request(SESSION, { id })
      set(response.session)
      questions.set(response.session.questions.slice(0).sort((a, b) => {
        return a.order - b.order
      }))
    }
  }
}

export const session = createSessionStore()

const createQuestionsStore = () => {
  const { subscribe, set, update } = writable()

  return {
    subscribe,
    update,
    set,
    get: async (id) => {
      session.get(id)
    }
  }
}

export const questions = createQuestionsStore()
