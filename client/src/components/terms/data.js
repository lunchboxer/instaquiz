import { writable } from 'svelte/store'
import { request } from '../../data/fetch-client'
import { TERMS_AND_ALL } from '../../data/queries'
import { CREATE_TERM } from '../../data/mutations'
import { courses } from '../courses/data'
// import { CREATE_TERM } from '../../data/mutations'

const createTermsStore = () => {
  const { subscribe, set, update } = writable()

  return {
    subscribe,
    update,
    get: async () => {
      const response = await request(TERMS_AND_ALL)
      set(response.terms)
      courses.set(
        response.terms.reduce((list, term) => {
          return list.concat(term.courses.map(course => {
            return { ...course, term: { id: term.id, name: term.name } }
          }))
        }, [])
      )
    },
    create: async (input) => {
      const { createTerm } = await request(CREATE_TERM, { ...input })
      update(previous => !previous ? [createTerm] : [...previous, createTerm])
    }
  }
}

export const terms = createTermsStore()
