
exports.session = {
  async importQuestions (_, { fromSessionId, toSessionId }, { prisma }) {
    const fromQuestions = await prisma.session({ id: fromSessionId }).questions()
    await Promise.all(fromQuestions.map(async question => {
      const answers = await prisma.question({ id: question.id }).answers()
      return prisma.updateSession({
        where: { id: toSessionId },
        data: {
          questions: {
            create: {
              text: question.text,
              answers: { create: answers.map(ans => ({ text: ans.text })) }
            }
          }
        }
      })
    }))
    return prisma.session({ id: toSessionId })
  },
  createSession (_, { startsAt, endsAt, courseId }, context) {
    // add schedule conflict and is within termdates validation
    return context.prisma.createSession({
      startsAt,
      endsAt,
      course: {
        connect: {
          id: courseId
        }
      }
    })
  }
}
