exports.response = {
  async answerQuestion (_, { sessionId, answerId, questionId, studentId }, context) {
    const existingResponses = await context.prisma.responses({
      where: { question: { id: questionId }, student: { id: studentId } }
    })
    if (existingResponses && existingResponses.length > 0) {
      return context.prisma.updateResponse({
        where: { id: existingResponses[0].id },
        data: {
          answer: {
            connect: { id: answerId }
          }
        }
      })
    }
    return context.prisma.createResponse({
      session: {
        connect: { id: sessionId }
      },
      answer: {
        connect: { id: answerId }
      },
      question: {
        connect: { id: questionId }
      },
      student: {
        connect: { id: studentId }
      }
    })
  },
  deleteResponse (_, { id }, { prisma }) {
    return prisma.deleteResponse({ id })
  }
}
