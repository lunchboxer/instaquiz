const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

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
  async changePassword (root, { username, oldPassword, newPassword }, context) {
    const user = await context.prisma.user({ username })
    if (!user) {
      throw new Error(`User '${username}' not found`)
    }
    const passwordValid = await bcrypt.compare(oldPassword, user.password)
    if (!passwordValid) {
      throw new Error('Old password not correct')
    }
    const password = await bcrypt.hash(newPassword, 10)
    return context.prisma.updateUser({
      where: { username },
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
  }
}

module.exports = { auth }
