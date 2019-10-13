exports.Message = {
  session (root, _, context) {
    return context.prisma.message({ id: root.id }).session()
  }
}
