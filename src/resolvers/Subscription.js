exports.Subscription = {
  questions: {
    subscribe: async (_, { sessionId }, { prisma }) => {
      return prisma.$subscribe.question({
        mutation_in: ['UPDATED'],
        node: { session: { id: sessionId } },
        updatedFields_contains: 'asked'
      }).node()
    },
    resolve: payload => {
      return payload
    }
  }
}
