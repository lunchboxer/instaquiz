exports.Answer = {
  responses (root, args, context) {
    return context.prisma.answer({ id: root.id }).responses()
  }
}
