exports.Term = {
  courses (root, args, context) {
    return context.prisma.term({ id: root.id }).courses()
  }
}
