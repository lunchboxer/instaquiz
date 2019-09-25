const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { getUserId } = require('../../utils')

const auth = {
  async signup (root, args, context) {
    const password = await bcrypt.hash(args.password, 10)
    const user = await context.prisma.createUser({
      username: args.username,
      name: args.name,
      password
    })

    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user
    }
  },
  async login (root, { username, password }, context) {
    const user = await context.prisma.user({ username })
    if (!user) {
      throw new Error(`User '${username}' not found`)
    }
    const passwordValid = await bcrypt.compare(password, user.password)
    if (!passwordValid) {
      throw new Error('Invalid password')
    }
    return {
      token: jwt.sign({ userId: user.id }, process.env.APP_SECRET),
      user
    }
  },
  async changePassword (_, { oldPassword, newPassword }, context) {
    const id = getUserId(context)
    const user = await context.prisma.user({ id })
    if (!user) {
      throw new Error(`User '${id}' not found`)
    }
    const passwordValid = await bcrypt.compare(oldPassword, user.password)
    if (!passwordValid) {
      throw new Error('Old password not correct')
    }
    const password = await bcrypt.hash(newPassword, 10)
    return context.prisma.updateUser({
      where: { id },
      data: { password }
    })
  },
  async resetPassword (_, { username }, context) {
    const newPassword = Math.random().toString(36).substring(2)
    const password = await bcrypt.hash(newPassword, 10)
    await context.prisma.updateUser({
      where: { username },
      data: { password }
    })
    return newPassword
  },
  updateUser (_, { id, input }, context) {
    return context.prisma.updateUser({ where: { id }, data: input })
  }
}

module.exports = { auth }
