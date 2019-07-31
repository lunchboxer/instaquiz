exports.prompt = {
  async createPrompt (_, { text, order, sessionId }, context) {
    let newOrder = null
    if (order) {
      const existing = await context.prisma.prompts({ where: { order } })
      if (existing && existing.length > 0) {
        newOrder = order
        const query = `UPDATE default$default."Prompt" set "order" = "order" + 1 where "order" >= ${order};`
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
    newOrder = newOrder || await context.prisma.promptsConnection({
      where: {
        session: {
          id: sessionId
        }
      }
    }).aggregate().count()
    return context.prisma.createPrompt({
      text,
      order: newOrder,
      session: {
        connect: {
          id: sessionId
        }
      }
    })
  },
  async updatePrompt (_, { id, text, order }, context) {
    if (order) {
      const previous = await context.prisma.prompt({ id })
      // if previous order was 0 and new order is 5 then we need to shift down all prompts where order > 0 && order <= 5
      if (previous.order < order) {
        const query = `UPDATE default$default."Prompt" set "order" = "order" - 1 where "order" > ${previous.order} and "order" <= ${order};`
          .replace(/"/g, '\\"').replace(/\n/g, ' ').replace(/\s+/g, ' ')
        await context.prisma.$graphql(`
          mutation {
            executeRaw(query: "${query}")
          }
        `)
      }
      // if previous order was 5 and new order is 0 then we need to shift up all prompts where order >= 0 && order < 5
      if (previous.order > order) {
        const query = `UPDATE default$default."Prompt" set "order" = "order" + 1 where "order" >= ${order} and "order" < ${previous.order};`
          .replace(/"/g, '\\"').replace(/\n/g, ' ').replace(/\s+/g, ' ')
        await context.prisma.$graphql(`
          mutation {
            executeRaw(query: "${query}")
          }
        `)
      }
    }
    return context.prisma.updatePrompt({
      data: { text, order },
      where: { id }
    })
  },
  async deletePrompt (_, { id }, context) {
    // find out what order it was
    const previous = await context.prisma.prompt({ id })
    // delete the item
    const deleted = await context.prisma.deletePrompt({ id })
    // then close the gap by shifting the order of the other items
    const query = `UPDATE default$default."Prompt" set "order" = "order" - 1 where "order" > ${previous.order};`
      .replace(/"/g, '\\"').replace(/\n/g, ' ').replace(/\s+/g, ' ')
    await context.prisma.$graphql(`
      mutation {
        executeRaw(query: "${query}")
      }
    `)
    return deleted
  }
}
