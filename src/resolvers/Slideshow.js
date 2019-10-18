exports.SlideShow = {
  slides (root, _, { prisma }) {
    return prisma.slideShow({ id: root.id }).slides({ orderBy: 'order_ASC' })
  }
}
