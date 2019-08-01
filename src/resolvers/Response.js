exports.Response = {
  answer (root, args, context) {
    return context.prisma.response({ id: root.id }).answer()
  },
  question (root, args, context) {
    return context.prisma.response({ id: root.id }).question()
  },
  student (root, args, context) {
    return context.prisma.response({ id: root.id }).student()
  },
  session (root, args, context) {
    return context.prisma.response({ id: root.id }).session()
  }
}
