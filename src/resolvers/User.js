exports.User = {
  coursesAttending (root, args, context) {
    return context.prisma.user({ id: root.id }).coursesAttending()
  },
  coursesTeaching (root, args, context) {
    return context.prisma.user({ id: root.id }).coursesTeaching()
  },
  calls (root, args, context) {
    return context.prisma.user({ id: root.id }).calls()
  }
}
