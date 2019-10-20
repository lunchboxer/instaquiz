const shiftOrderUp = async (order, slideshowId, prisma, max) => {
  const slidesToChange = await prisma.slideshow({ id: slideshowId }).slides({
    where: {
      order_gte: order,
      order_lt: max
    }
  })
  slidesToChange.forEach(async slide => {
    await prisma.updateSlide({
      data: { order: slide.order + 1 },
      where: { id: slide.id }
    })
  })
}

const shiftOrderDown = async (order, slideshowId, prisma, min) => {
  const slidesToChange = await prisma.slideshow({ id: slideshowId }).slides({
    where: {
      order_gt: min,
      order_lte: order
    }
  })
  slidesToChange.forEach(async slide => {
    await prisma.updateSlide({
      data: { order: slide.order - 1 },
      where: { id: slide.id }
    })
  })
}

exports.slideshow = {
  createSlideshow (_, { name }, context) {
    return context.prisma.createSlideshow({ name })
  },
  async addSlide (_, { slideshowId, order, contents }, { prisma }) {
    let newOrder = null
    if (typeof order === 'number') {
      const existing = await prisma.slideshow({ id: slideshowId }).slides({ where: { order } })
      if (existing && existing.length > 0) {
        newOrder = order
        await shiftOrderUp(order, slideshowId, prisma)
      }
    }
    if (newOrder === null) {
      newOrder = (await prisma.slideshow({ id: slideshowId }).slides()).length
    }
    return prisma.updateSlideshow({
      where: { id: slideshowId },
      data: {
        slides: { create: { order: newOrder, contents } }
      }
    })
  },
  async updateSlide (_, { slideshowId, id, order, contents }, { prisma }) {
    if (typeof order === 'number') {
      const previous = await prisma.slide({ id })
      if (previous.order < order) {
        await shiftOrderDown(order, slideshowId, prisma, previous.order)
      }
      // if previous order was 5 and new order is 0 then we need to shift up all prompts where order >= 0 && order < 5
      if (previous.order > order) {
        await shiftOrderUp(order, slideshowId, prisma, previous.order)
      }
    }
    return prisma.updateSlideshow({
      where: { id: slideshowId },
      data: {
        slides: {
          update: {
            where: { id },
            data: { order, contents }
          }
        }
      }
    })
  },
  async deleteSlide (_, { slideshowId, id }, { prisma }) {
    // find out what order it was
    const previous = await prisma.slide({ id })
    // delete the item
    await prisma.deleteSlide({ id })
    // then close the gap by shifting the order of the other items
    await shiftOrderDown(undefined, slideshowId, prisma, previous.order)

    return prisma.slideshow({ id: slideshowId })
  }
}
