exports.response = {
  answerQuestion (_, { sessionId, answerId, questionId, studentId }, context) {
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
  }
}
