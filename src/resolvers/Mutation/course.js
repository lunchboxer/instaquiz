exports.course = {
  async createCourse (_, { name, termId, code }, context) {
    return context.prisma.createCourse({
      name,
      code: code.toUpperCase(),
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
      where: { code: code.toUpperCase() }
    })
  },
  addTeacherToCourse (_, { id, courseId }, context) {
    return context.prisma.updateCourse({
      data: {
        teachers: { connect: { id } }
      },
      where: { id: courseId }
    })
  },
  removeTeacherFromCourse (_, { id, courseId }, context) {
    return context.prisma.updateCourse({
      data: {
        teachers: { disconnect: { id } }
      },
      where: { id: courseId }
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
    return context.prisma.deleteCourse({ id })
  }
}
