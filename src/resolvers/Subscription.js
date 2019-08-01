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
  },
  responses: {
    subscribe: async (_, { sessionId, questionId }, { prisma }) => {
      return prisma.$subscribe.response({
        mutation_in: ['CREATED'],
        node: {
          session: { id: sessionId },
          question: { id: questionId }
        }
      }).node()
    },
    resolve: payload => {
      return payload
    }
  }
}
