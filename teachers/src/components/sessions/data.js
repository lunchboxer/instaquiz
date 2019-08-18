import { writable } from 'svelte/store'
import { request } from '../../data/fetch-client'
import { SESSION } from '../../data/queries'

const createSessionStore = () => {
  const { subscribe, set, update } = writable()

  return {
    subscribe,
    update,
    get: async (id) => {
      const response = await request(SESSION, { id })
      set(response.session)
    }
  }
}

export const session = createSessionStore()
