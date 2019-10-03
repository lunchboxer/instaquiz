exports.Subscription = {
  questions: {
    subscribe: async (_, { sessionId }, { prisma }) => {
      return prisma.$subscribe.question({
        mutation_in: ['UPDATED'],
        node: { session: { id: sessionId } },
        updatedFields_contains: ['asked', 'publishResponses']
      }).node()
    },
    resolve: payload => {
      return payload
    }
  },
  responses: {
    subscribe: async (_, { sessionId, questionId }, { prisma }) => {
      return prisma.$subscribe.response({
        mutation_in: ['CREATED', 'UPDATED'],
        node: {
          session: { id: sessionId },
          question: { id: questionId }
        }
      }).node()
    },
    resolve: payload => {
      return payload
    }
  },
  calls: {
    subscribe: async (_, { sessionId }, { prisma }) => {
      return prisma.$subscribe.call({
        mutation_in: ['CREATED', 'UPDATED'],
        node: {
          session: { id: sessionId }
        }
      }).node()
    },
    resolve: payload => {
      return payload
    }
  },
  absences: {
    subscribe: async (_, { sessionId }, { prisma }) => {
      return prisma.$subscribe.absence({
        mutation_in: ['CREATED', 'DELETED'],
        node: {
          session: { id: sessionId }
        }
      })
    },
    resolve: payload => {
      return payload
    }
  }
}
