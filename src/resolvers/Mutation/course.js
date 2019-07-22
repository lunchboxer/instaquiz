exports.course = {
  async createCourse (_, { name, termId, code }, context) {
    return context.prisma.createCourse({
      name,
      code,
      term: {
        connect: {
          id: termId
        }
      }
    })
  },
  async addStudentToCourse (_, { id, code }, context) {
    return context.prisma.updateCourse({
      data: {
        students: { connect: { id } }
      },
      where: { code }
    })
  },
  // async updateCourse(_, args, context) {
  //   let data = {}
  //   if (args.termId) {
  //     data = {
  //       name: args.name,
  //       term: { connect: { id: args.termId } }
  //     }
  //   } else {
  //     data = { name: args.name, code: args.code }
  //   }
  //   return context.prisma.updateCourse({
  //     data,
  //     where: { id : args.id }
  //   });
  // },
  deleteCourse (_, { id }, context) {
    return context.prisma.deleteTerm({ id })
  }
}
