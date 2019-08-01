exports.question = {
  async createQuestion (_, { text, order, sessionId }, context) {
    let newOrder = null
    if (typeof order === 'number') {
      const existing = await context.prisma.questions({ where: { order } })
      if (existing && existing.length > 0) {
        newOrder = order
        const query = `UPDATE default$default."Question" set "order" = "order" + 1 where "order" >= ${order};`
          .replace(/"/g, '\\"').replace(/\n/g, ' ').replace(/\s+/g, ' ')
        await context.prisma.$graphql(`
          mutation {
            executeRaw(query: "${query}")
          }
        `)
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
  async updateQuestion (_, { id, text, order }, context) {
    if (order) {
      const previous = await context.prisma.question({ id })
      // if previous order was 0 and new order is 5 then we need to shift down all prompts where order > 0 && order <= 5
      if (previous.order < order) {
        const query = `UPDATE default$default."Question" set "order" = "order" - 1 where "order" > ${previous.order} and "order" <= ${order};`
          .replace(/"/g, '\\"').replace(/\n/g, ' ').replace(/\s+/g, ' ')
        await context.prisma.$graphql(`
          mutation {
            executeRaw(query: "${query}")
          }
        `)
      }
      // if previous order was 5 and new order is 0 then we need to shift up all prompts where order >= 0 && order < 5
      if (previous.order > order) {
        const query = `UPDATE default$default."Question" set "order" = "order" + 1 where "order" >= ${order} and "order" < ${previous.order};`
          .replace(/"/g, '\\"').replace(/\n/g, ' ').replace(/\s+/g, ' ')
        await context.prisma.$graphql(`
          mutation {
            executeRaw(query: "${query}")
          }
        `)
      }
    }
    return context.prisma.updateQuestion({
      data: { text, order },
      where: { id }
    })
  },
  async deleteQuestion (_, { id }, context) {
    // find out what order it was
    const previous = await context.prisma.question({ id })
    // delete the item
    const deleted = await context.prisma.deleteQuestion({ id })
    // then close the gap by shifting the order of the other items
    const query = `UPDATE default$default."Question" set "order" = "order" - 1 where "order" > ${previous.order};`
      .replace(/"/g, '\\"').replace(/\n/g, ' ').replace(/\s+/g, ' ')
    await context.prisma.$graphql(`
      mutation {
        executeRaw(query: "${query}")
      }
    `)
    return deleted
  }
}
