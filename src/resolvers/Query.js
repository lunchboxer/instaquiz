const { getUserId } = require('../utils')

exports.Query = {
  me (_, args, context) {
    const id = getUserId(context)
    return context.prisma.user({ id })
  },
  user (_, args, context) {
    return context.prisma.user({ id: args.id })
  },
  users (_, args, context) {
    return context.prisma.users()
  },
  course (_, args, context) {
    return context.prisma.course({ id: args.id })
  },
  courses (_, { orderBy, where }, context) {
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
    return context.prisma.sessions({ orderBy, where })
  },
  prompt (_, args, context) {
    return context.prisma.prompt({ id: args.id })
  },
  prompts (_, { orderBy, where }, context) {
    return context.prisma.prompts({ orderBy, where })
  },
  answer (_, args, context) {
    return context.prisma.answer({ id: args.id })
  },
  answers (_, args, context) {
    return context.prisma.answers()
  },
  response (_, args, context) {
    return context.prisma.response({ id: args.id })
  },
  responses (_, args, context) {
    return context.prisma.responses()
  }
}
