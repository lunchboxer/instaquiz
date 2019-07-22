exports.Course = {
  term (root, args, context) {
    return context.prisma.course({ id: root.id }).term()
  },
  students (root, args, context) {
    return context.prisma.course({ id: root.id }).students()
  }
}
