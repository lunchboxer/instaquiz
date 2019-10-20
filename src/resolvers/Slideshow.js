exports.Slideshow = {
  slides (root, _, { prisma }) {
    return prisma.slideshow({ id: root.id }).slides({ orderBy: 'order_ASC' })
  }
}
