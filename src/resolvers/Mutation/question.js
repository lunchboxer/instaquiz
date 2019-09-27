
const shiftOrderUp = async (order, sessionId, prisma, max) => {
  const questionsToChange = await prisma.questions({
    where: {
      order_gte: order,
      order_lt: max,
      session: { id: sessionId }
    }
  })
  questionsToChange.forEach(async question => {
    await prisma.updateQuestion({
      data: { order: question.order + 1 },
      where: { id: question.id }
    })
  })
}

const shiftOrderDown = async (order, sessionId, prisma, min) => {
  const questionsToChange = await prisma.questions({
    where: {
      order_gt: min,
      order_lte: order,
      session: { id: sessionId }
    }
  })
  questionsToChange.forEach(async question => {
    await prisma.updateQuestion({
      data: { order: question.order - 1 },
      where: { id: question.id }
    })
  })
}

const fragmentWithSession = `
fragment QuestionWithSession on Question {
  id
  order
  session {
    id
  }
}`

exports.question = {
  async createQuestion (_, { text, order, sessionId }, context) {
    let newOrder = null
    if (typeof order === 'number') {
      const existing = await context.prisma.questions({ where: { order } })
      if (existing && existing.length > 0) {
        newOrder = order
        await shiftOrderUp(order, sessionId, context.prisma)
      }
    }
    // order on server side should count from 0
    // if newOrder has been set then keep it otherwise put new prompt at end of the list
    if (newOrder === null) {
      newOrder = await context.prisma.questionsConnection({
        where: {
          session: {
            id: sessionId
          }
        }
      }).aggregate().count()
    }
    return context.prisma.createQuestion({
      text,
      order: newOrder,
      session: {
        connect: {
          id: sessionId
        }
      }
    })
  },
  askQuestion (_, { id }, context) {
    return context.prisma.updateQuestion({
      data: { asked: new Date() },
      where: { id }
    })
  },
  async updateQuestion (_, { id, input }, context) {
    if (input.order) {
      const previous = await context.prisma.question({ id }).$fragment(fragmentWithSession)
      // if previous order was 0 and new order is 5 then we need to shift down all prompts where order > 0 && order <= 5
      if (previous.order < input.order) {
        await shiftOrderDown(input.order, previous.session.id, context.prisma, previous.order)
      }
      // if previous order was 5 and new order is 0 then we need to shift up all prompts where order >= 0 && order < 5
      if (previous.order > input.order) {
        await shiftOrderUp(input.order, previous.session.id, context.prisma, previous.order)
      }
    }
    return context.prisma.updateQuestion({
      data: input,
      where: { id }
    })
  },
  async deleteQuestion (_, { id }, context) {
    // find out what order it was
    const previous = await context.prisma.question({ id }).$fragment(fragmentWithSession)
    // delete the item
    const deleted = await context.prisma.deleteQuestion({ id })
    // then close the gap by shifting the order of the other items
    await shiftOrderDown(undefined, previous.session.id, context.prisma, previous.order)

    return deleted
  }
}
