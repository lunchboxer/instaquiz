exports.User = {
  coursesAttending (root, _, context) {
    return context.prisma.user({ id: root.id }).coursesAttending()
  },
  coursesTeaching (root, _, context) {
    return context.prisma.user({ id: root.id }).coursesTeaching()
  },
  calls (root, _, context) {
    return context.prisma.user({ id: root.id }).calls()
  }
}
