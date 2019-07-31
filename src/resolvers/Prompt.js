exports.Prompt = {
  answers (root, args, context) {
    return context.prisma.prompt({ id: root.id }).answers()
  },
  responses (root, args, context) {
    return context.prisma.prompt({ id: root.id }).responses()
  },
  session (root, args, context) {
    return context.prisma.prompt({ id: root.id }).session()
  }
}
