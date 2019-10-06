const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')
const { resolvers } = require('./resolvers')
const { permissions } = require('./permissions')
const serveStatic = require('serve-static')

const production = process.env.NODE_ENV === 'production'

const server = new GraphQLServer({
  typeDefs: 'src/schema.graphql',
  resolvers,
  middlewares: [permissions],
  context: request => {
    return {
      ...request,
      prisma
    }
  }
})
if (process.env.NODE_ENV === 'production') {
  server.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https') {
      res.redirect(`https://${req.header('host')}${req.url}`)
    } else {
      next()
    }
  })
}
server.use('/teachers', serveStatic('teachers/public'))
server.use('/students', serveStatic('students/public'))

server.get('/', (_, response) => response.redirect('/students/'))

const options = {
  endpoint: '/api',
  playground: !production && '/playground',
  subscriptions: '/api'
}
server.start(options, () => {
  if (production) {
    console.log(`Server is running at ${process.env.ENDPOINT}`)
  } else {
    console.log('Server is running at http://localhost:4000')
  }
})
