exports.session = {
  async createSession (_, { startsAt, endsAt, courseId }, context) {
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
