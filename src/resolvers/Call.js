exports.Call = {
  student (root, _, context) {
    return context.prisma.call({ id: root.id }).student()
  },
  session (root, _, context) {
    return context.prisma.call({ id: root.id }).session()
  }
}
