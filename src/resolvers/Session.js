exports.Session = {
  course (root, args, context) {
    return context.prisma.session({ id: root.id }).course()
  },
  async order (root, args, context) {
    const thisSession = await context.prisma.session({ id: root.id })
    const course = await context.prisma.session({ id: root.id }).course()
    const sessions = await context.prisma.sessionsConnection({
      where: { startsAt_lt: thisSession.startsAt, course: { id: course.id } }
    }).aggregate().count()
    return sessions + 1
  },
  questions (root, args, context) {
    return context.prisma.session({ id: root.id }).questions({ orderBy: 'order_ASC' })
  },
  calls (root, args, context) {
    return context.prisma.session({ id: root.id }).calls({ orderBy: 'createdAt_DESC' })
  },
  slideshows (root, args, context) {
    return context.prisma.session({ id: root.id }).slideshows()
  }
}
