import { writable } from 'svelte/store'
import { request } from '../../data/fetch-client'
import { TERMS_AND_ALL } from '../../data/queries'
// import { CREATE_TERM } from '../../data/mutations'

const createTermsStore = () => {
  const { subscribe, update } = writable(null, set => {
    request(TERMS_AND_ALL).then(response => set(response.terms))
  })
  return {
    subscribe,
    update
  }
}

export const terms = createTermsStore()
