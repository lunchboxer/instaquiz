import { writable } from 'svelte/store'
import { request } from '../../data/fetch-client'
import { SLIDESHOWS, SLIDESHOW } from '../../data/queries'
import { CREATE_SLIDESHOW, CREATE_SLIDE, UPDATE_SLIDE, DELETE_SLIDE } from '../../data/mutations'

const createSlideshowsStore = () => {
  const { subscribe, set, update } = writable()

  return {
    subscribe,
    update,
    set,
    get: async (id) => {
      if (!id) {
        const response = await request(SLIDESHOWS)
        set(response.slideshows)
      } else {
        const response = await request(SLIDESHOW, { id })
        update(previous => {
          if (!previous) {
            return [response.slideshow]
          }
          return previous.map(slideshow => {
            if (slideshow.id === id) return response.slideshow
            return slideshow
          })
        })
      }
    },
    create: async name => {
      const response = await request(CREATE_SLIDESHOW, { name })
      update(previous => [...previous, response.createSlideshow])
    },
    addSlide: async ({ slideshowId, order, contents }) => {
      console.log(order)
      const response = await request(CREATE_SLIDE, { slideshowId, order, contents })
      update(previous => previous.map(slideshow => {
        if (slideshow.id === slideshowId) return response.addSlide
        return slideshow
      }))
    },
    editSlide: async ({ slideshowId, id, order, contents }) => {
      const response = await request(UPDATE_SLIDE, { slideshowId, id, order, contents })
      update(previous => previous.map(slideshow => {
        if (slideshow.id === slideshowId) return response.updateSlide
        return slideshow
      }))
    },
    deleteSlide: async ({ slideshowId, id }) => {
      const response = await request(DELETE_SLIDE, { slideshowId, id })
      update(previous => previous.map(slideshow => {
        if (slideshow.id === slideshowId) return response.deleteSlide
        return slideshow
      }))
    }
  }
}

export const slideshows = createSlideshowsStore()
