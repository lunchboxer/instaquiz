import { writable } from 'svelte/store'
import { client } from './apollo'
import { me } from '../components/profile/data'
import { mutate } from 'svelte-apollo'
import { LOGIN, SIGNUP } from './mutations'

const getAuthFromStorage = () => {
  const coldToken = window.localStorage.getItem('token')
  const coldUser = window.localStorage.getItem('user')
  const token = coldToken ? JSON.parse(coldToken) : null
  const user = coldUser ? JSON.parse(coldUser) : null
  return { user, token }
}

const createAuthStore = () => {
  // pull token and user from localStorage if it's there
  const { user, token } = getAuthFromStorage()
  const { subscribe, set, update } = writable({ ...user, token })

  return {
    subscribe,
    login: async (username, password) => {
      const response = await mutate(client, {
        mutation: LOGIN,
        variables: { username, password }
      })
      window.localStorage.setItem('user', JSON.stringify(response.data.login.user))
      window.localStorage.setItem('token', JSON.stringify(response.data.login.token))
      update(previous => ({
        ...previous,
        ...response.data.login.user,
        token: response.data.login.token
      }))
    },
    signup: async (username, name, password) => {
      const response = await mutate(client, {
        mutation: SIGNUP,
        variables: { username, name, password }
      })
      window.localStorage.setItem('user', JSON.stringify(response.data.signup.user))
      window.localStorage.setItem('token', JSON.stringify(response.data.signup.token))
      update(previous => ({
        ...previous,
        ...response.data.signup.user,
        token: response.data.signup.token
      }))
    },
    logout: () => {
      const { user } = getAuthFromStorage()
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('user')
      set({})
      me.set()
      client.resetStore()
      return user && user.username
    }
  }
}

export const auth = createAuthStore()
