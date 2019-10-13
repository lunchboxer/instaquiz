exports.call = {
  async sendMessage (_, { sessionId, label, body }, { prisma }) {
    const existing = await prisma.messages({ where: { session: { id: sessionId } } })
    if (existing && existing.length > 0) {
      return prisma.updateMessage({
        where: { id: existing[0].id },
        data: {
          label,
          body
        }
      })
    } else {
      return prisma.createMessage({
        session: { connect: { id: sessionId } },
        label,
        body
      })
    }
  }
}
