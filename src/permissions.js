const { rule, shield, or } = require('graphql-shield')
const { getUserId } = require('./utils')

// Rules
const isAuthenticatedUser = rule()((parent, args, context) => {
  const userId = getUserId(context)
  return Boolean(userId)
})

const isThisUser = rule()((parent, args, context) => {
  const userId = getUserId(context)
  return userId === args.id
})

const isTeacher = rule()((parent, args, context) => {
  const userId = getUserId(context)
  return context.prisma.$exists.user({ id: userId, role: 'Teacher' })
})

// Permissions

exports.permissions = shield({
  Query: {
    me: isAuthenticatedUser
  },
  Mutation: {
    addStudentToCourse: or(isThisUser, isTeacher),
    addTeacherToCourse: isTeacher,
    createTerm: isTeacher,
    updateTerm: isTeacher,
    deleteTerm: isTeacher,
    createCourse: isTeacher,
    deleteCourse: isTeacher,
    createQuestion: isTeacher,
    updateQuestion: isTeacher,
    deleteQuestion: isTeacher,
    resetPassword: isTeacher
  }
})
