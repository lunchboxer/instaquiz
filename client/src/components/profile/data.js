import { writable } from 'svelte/store'
import { request } from '../../data/fetch-client'
import { ME } from '../../data/queries'

const createMeStore = () => {
  const { subscribe, set, update } = writable()

  return {
    subscribe,
    update,
    set,
    get: async () => {
      const response = await request(ME)
      set(response.me)
    }
  }
}

export const me = createMeStore()
