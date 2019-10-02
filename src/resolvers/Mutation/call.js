exports.call = {
  async callStudent (_, { sessionId }, context) {
    // making the call is easy, the hard part is picking a student to call in a smart way
    // for now lets only focus on calls this session, later we can look into the whole course
    // we could find all students and find a list of all calls and compare them
    // make a list of who hasn't been called and choose from that list
    // if the list is empty then just randomly pick a student.

    // this can be improved by counting the number of calls on a student in this course
    // then weighting the random selection with it.
    const notCalledStudents = await context.prisma.session({ id: sessionId })
      .course()
      .students({ where: { calls_none: { session: { id: sessionId } } } })
    let studentId
    if (notCalledStudents.length > 0) {
      studentId = notCalledStudents[Math.floor(Math.random() * notCalledStudents.length)].id
    } else {
      const students = await context.prisma.session({ id: sessionId })
        .course()
        .students()
      if (!students || students.length === 0) throw new Error('Session has no students')
      studentId = students[Math.floor(Math.random() * students.length)].id
    }
    return context.prisma.createCall({
      student: {
        connect: {
          id: studentId
        }
      },
      session: {
        connect: {
          id: sessionId
        }
      }
    })
  },
  evaluateStudent (_, { callId, evaluation }, { prisma }) {
    return prisma.updateCall({
      where: { id: callId },
      data: { evaluation }
    })
  }
}
