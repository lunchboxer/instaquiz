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
  }
}

module.exports = { auth }
