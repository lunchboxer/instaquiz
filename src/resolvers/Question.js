exports.Question = {
  answers (root, args, context) {
    return context.prisma.question({ id: root.id }).answers()
  },
  responses (root, args, context) {
    return context.prisma.question({ id: root.id }).responses()
  },
  session (root, args, context) {
    return context.prisma.question({ id: root.id }).session()
  }
}
