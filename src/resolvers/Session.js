exports.Session = {
  course (root, args, context) {
    return context.prisma.session({ id: root.id }).course()
  }
}
