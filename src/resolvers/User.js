exports.User = {
  coursesAttending(root, args, context) {
    return context.prisma.user({ id: root.id }).coursesAttending();
  }
};
