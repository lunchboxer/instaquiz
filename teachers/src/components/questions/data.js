import { writable } from 'svelte/store'
import { request } from '../../data/fetch-client'
import { QUESTION, DUPLICATE_QUESTIONS } from '../../data/queries'
import { CREATE_ANSWER, DELETE_ANSWER } from '../../data/mutations'

const createQuestionStore = () => {
  const { subscribe, set, update } = writable()

  return {
    subscribe,
    update,
    get: async (id) => {
      set()
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
  }
}

export const question = createQuestionStore()

const createDuplicateQuestionsStore = () => {
  const { subscribe, set, update } = writable()

  return {
    subscribe,
    update,
    set,
    get: async () => {
      const response = await request(DUPLICATE_QUESTIONS)
      set(response.duplicateQuestions)
    }
  }
}

export const duplicateQuestions = createDuplicateQuestionsStore()
