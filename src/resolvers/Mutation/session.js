exports.session = {
  async importQuestions (_, { fromSessionId, toSessionId }, { prisma }) {
    const fromQuestions = await prisma.session({ id: fromSessionId }).questions()
    const newOrder = await prisma.questionsConnection({
      where: {
        session: {
          id: toSessionId
        }
      }
    }).aggregate().count()
    await Promise.all(fromQuestions.map(async (question, index) => {
      const answers = await prisma.question({ id: question.id }).answers()
      return prisma.createQuestion({
        session: { connect: { id: toSessionId } },
        text: question.text,
        order: newOrder + index,
        answers: { create: answers.map(ans => ({ text: ans.text })) }
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
