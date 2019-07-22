const { checkConflicts, checkOrder } = require('../validation/term')

exports.term = {
  async createTerm (_, { name, startDate, endDate }, context) {
    await checkOrder(startDate, endDate, null, context)
    await checkConflicts(startDate, endDate, null, context)
    return context.prisma.createTerm({ name, startDate, endDate })
  },
  async updateTerm (_, { name, startDate, endDate, id }, context) {
    await checkOrder(startDate, endDate, id, context)
    await checkConflicts(startDate, endDate, id, context)
    return context.prisma.updateTerm({
      data: { startDate, endDate, name },
      where: { id }
    })
  },
  deleteTerm (_, args, context) {
    return context.prisma.deleteTerm({ id: args.id })
  }
}
