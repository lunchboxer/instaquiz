exports.Course = {
  term (root, _, context) {
    return context.prisma.course({ id: root.id }).term()
  },
  students (root, _, context) {
    return context.prisma.course({ id: root.id }).students({ orderBy: 'username_ASC' })
  },
  teachers (root, _, context) {
    return context.prisma.course({ id: root.id }).teachers()
  },
  sessions (root, _, context) {
    return context.prisma.course({ id: root.id }).sessions({ orderBy: 'startsAt_ASC' })
  }
}
