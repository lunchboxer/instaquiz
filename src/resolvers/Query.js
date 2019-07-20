const { getUserId } = require("../utils");

exports.Query = {
  user(_, args, context) {
    return context.prisma.user({ id: args.id });
  },
  users(_, args, context) {
    return context.prisma.users();
  },
  course(_, args, context) {
    return context.prisma.course({ id: args.id });
  },
  courses(_, args, context) {
    return context.prisma.courses();
  },
  term(_, args, context) {
    return context.prisma.term({ id: args.id });
  },
  terms(_, args, context) {
    return context.prisma.terms();
  },
  session(_, args, context) {
    return context.prisma.session({ id: args.id });
  },
  sessions(_, args, context) {
    return context.prisma.sessions();
  },
  prompt(_, args, context) {
    return context.prisma.prompt({ id: args.id });
  },
  prompts(_, args, context) {
    return context.prisma.prompts();
  },
  answer(_, args, context) {
    return context.prisma.answer({ id: args.id });
  },
  answers(_, args, context) {
    return context.prisma.answers();
  },
  response(_, args, context) {
    return context.prisma.response({ id: args.id });
  },
  responses(_, args, context) {
    return context.prisma.responses();
  }
};
