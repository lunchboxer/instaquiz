exports.Absence = {
  student (root, _, context) {
    return context.prisma.absence({ id: root.id }).student()
  },
  session (root, _, context) {
    return context.prisma.absence({ id: root.id }).session()
  }
}
