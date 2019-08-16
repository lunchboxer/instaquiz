import { writable } from 'svelte/store'
import { request } from './fetch-client'
import { LOGIN, SIGNUP } from './mutations'

const getAuthFromStorage = () => {
  const coldToken = window.localStorage.getItem('token')
  const coldUser = window.localStorage.getItem('user')
  const token = coldToken ? JSON.parse(coldToken) : null
  const user = coldUser ? JSON.parse(coldUser) : null
  return { user, token }
}

const createUserStore = () => {
  // pull token and user from localStorage if it's there
  const { user, token } = getAuthFromStorage()
  const { subscribe, set, update } = writable({ ...user, token })

  return {
    subscribe,
    login: async (username, password) => {
      const { login } = await request(LOGIN, { username, password })
      window.localStorage.setItem('user', JSON.stringify(login.user))
      window.localStorage.setItem('token', JSON.stringify(login.token))
      update(previous => ({
        ...previous,
        ...login.user,
        token: login.token
      }))
    },
    signup: async (username, name, password) => {
      const { signup } = await request(SIGNUP, { username, name, password })
      window.localStorage.setItem('user', JSON.stringify(signup.user))
      window.localStorage.setItem('token', JSON.stringify(signup.token))
      update(previous => ({
        ...previous,
        ...signup.user,
        token: signup.token
      }))
    },
    logout: () => {
      const { user } = getAuthFromStorage()
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('user')
      set()
      return user && user.username
    }
  }
}

export const user = createUserStore()