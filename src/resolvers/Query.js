const { getUserId } = require('../utils')

exports.Query = {
  me (_, args, context) {
    const id = getUserId(context)
    return context.prisma.user({ id })
  },
  user (_, args, context) {
    return context.prisma.user({ id: args.id })
  },
  users (_, { orderBy = 'username_ASC', where }, context) {
    return context.prisma.users({ orderBy, where })
  },
  course (_, args, context) {
    return context.prisma.course({ id: args.id })
  },
  courses (_, { orderBy = 'name_ASC', where }, context) {
    return context.prisma.courses({
      orderBy,
      where
    })
  },
  term (_, args, context) {
    return context.prisma.term({ id: args.id })
  },
  terms (_, { orderBy, where }, context) {
    return context.prisma.terms({ orderBy, where })
  },
  session (_, args, context) {
    return context.prisma.session({ id: args.id })
  },
  sessions (_, { orderBy, where }, context) {
    return context.prisma.sessions({ orderBy: orderBy || 'startsAt_ASC', where })
  },
  question (_, args, context) {
    return context.prisma.question({ id: args.id })
  },
  questions (_, { orderBy, where, first, last }, context) {
    return context.prisma.questions({ orderBy: orderBy || 'order_ASC', where, first, last })
  },
  answer (_, args, context) {
    return context.prisma.answer({ id: args.id })
  },
  answers (_, { orderBy, where }, context) {
    return context.prisma.answers({ orderBy, where })
  },
  response (_, args, context) {
    return context.prisma.response({ id: args.id })
  },
  responses (_, { orderBy, where }, context) {
    return context.prisma.responses({ orderBy, where })
  },
  calls (_, { orderBy = 'createdAt_DESC', where, first, last }, context) {
    return context.prisma.calls({ orderBy, where, first, last })
  }
}
