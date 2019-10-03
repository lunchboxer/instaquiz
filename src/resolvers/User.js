const pinyin = require('pinyin')

exports.User = {
  coursesAttending (root, _, context) {
    return context.prisma.user({ id: root.id }).coursesAttending()
  },
  coursesTeaching (root, _, context) {
    return context.prisma.user({ id: root.id }).coursesTeaching()
  },
  calls (root, _, context) {
    return context.prisma.user({ id: root.id }).calls()
  },
  async pinyinName (root, _, context) {
    const user = await context.prisma.user({ id: root.id })
    const lowercasePinyin = pinyin(user.name).join('')
    return lowercasePinyin.charAt(0).toUpperCase() + lowercasePinyin.slice(1)
  }
}
