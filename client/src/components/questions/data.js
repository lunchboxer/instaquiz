import { writable } from 'svelte/store'
import { request } from '../../data/fetch-client'
import { QUESTION } from '../../data/queries'
import { CREATE_ANSWER, DELETE_ANSWER } from '../../data/mutations'

const createQuestionStore = () => {
  const { subscribe, set, update } = writable()

  return {
    subscribe,
    update,
    get: async (id) => {
      const response = await request(QUESTION, { id })
      set(response.question)
    },
    addAnswer: async (text, questionId) => {
      const { createAnswer } = await request(CREATE_ANSWER, { text, questionId })
      update(previous => ({ ...previous, answers: [...previous.answers, createAnswer] }))
    },
    deleteAnswer: async (id) => {
      await request(DELETE_ANSWER, { id })
      update(previous => ({ ...previous, answers: previous.answers.filter(a => a.id !== id) }))
    }
    // patch: (newSession, id, now, latest) => {
    //   if (!newSession.course.teachers.find(t => t.id === id)) return
    //   if (newSession.endsAt > now && newSession.endsAt < latest) {
    //     update(previous => {
    //       return [...previous, newSession].sort((a, b) => {
    //         a.startsAt.localeCompare(b.startsAt)
    //       })
    //     })
    //   }
    // }
  }
}

export const question = createQuestionStore()
