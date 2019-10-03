exports.absence = {
  async markStudentAbsent (_, { studentId, sessionId }, { prisma }) {
    // check if already absent
    const existing = await prisma.absences({
      where: {
        student: { id: studentId },
        session: { id: sessionId }
      }
    })
    if (existing && existing.length > 0) {
      throw new Error(`Student ${studentId} already marked absent for session ${sessionId}`)
    }
    return prisma.createAbsence({
      student: { connect: { id: studentId } },
      session: { connect: { id: sessionId } }
    })
  },
  async unmarkStudentAbsent (_, { studentId, sessionId }, { prisma }) {
    const existing = await prisma.absences({
      where: {
        student: { id: studentId },
        session: { id: sessionId }
      }
    })
    if (!existing || existing.length === 0) {
      throw new Error('Student is not already marked absent.')
    }
    return prisma.deleteAbsence({ id: existing[0].id })
  }
}
