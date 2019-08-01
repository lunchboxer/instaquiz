exports.response = {
  async answerQuestion (_, { sessionId, answerId, questionId, studentId }, context) {
    const response = await context.prisma.createResponse({
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
    console.log(response)
    return response
  }

}
