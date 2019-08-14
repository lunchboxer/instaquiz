import { writable } from 'svelte/store'
import { request } from '../../data/fetch-client'
import { ME } from '../../data/queries'

const createMeStore = () => {
  const { subscribe, set, update } = writable(null, set => {
    request(ME).then(response => set(response.me))
  })

  return {
    subscribe,
    update,
    get: async (id) => {
      if (!id) {
        request(ME).then(response => set(response.me))
      } else {
        // load a term by id and add it to terms
      }
    }
  }
}

export const me = createMeStore()
