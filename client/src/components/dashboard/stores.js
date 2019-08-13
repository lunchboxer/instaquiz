import { readable, writable } from 'svelte/store'

export function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export const nowSession = writable()
export const imminentSession = writable()
export const currentQuestion = writable()

export const time = readable(new Date(), set => {
  const interval = setInterval(() => {
    set(new Date())
  }, 1000)
  return () => clearInterval(interval)
})

export const everyMinute = readable(new Date(), set => {
  const interval = setInterval(() => {
    set(new Date())
  }, 6e+4)
  return () => clearInterval(interval)
})

export const every15Seconds = readable(new Date(), set => {
  const interval = setInterval(() => {
    set(new Date())
  }, 15000)
  return () => clearInterval(interval)
})

export const every2Hours = readable(new Date(), set => {
  const interval = setInterval(() => {
    set(new Date())
  }, 2 * 3.6e+6)
  return () => clearInterval(interval)
})
