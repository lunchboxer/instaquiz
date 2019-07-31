exports.answer = {
  async createAnswer (_, { text, questionId }, context) {
    return context.prisma.createAnswer({
      text,
      question: {
        connect: {
          id: questionId
        }
      }
    })
  },
  async deleteAnswer (_, { id }, context) {
    return context.prisma.deleteAnswer({ id })
  }
}
