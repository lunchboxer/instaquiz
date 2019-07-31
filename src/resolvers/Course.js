exports.Course = {
  term (root, args, context) {
    return context.prisma.course({ id: root.id }).term()
  },
  students (root, args, context) {
    return context.prisma.course({ id: root.id }).students()
  },
  teachers (root, args, context) {
    return context.prisma.course({ id: root.id }).teachers()
  },
  sessions (root, args, context) {
    return context.prisma.course({ id: root.id }).sessions({ orderBy: 'startsAt_ASC' })
  }
}
