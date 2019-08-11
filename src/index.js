const { GraphQLServer } = require('graphql-yoga')
const { prisma } = require('./generated/prisma-client')
const { resolvers } = require('./resolvers')
const { permissions } = require('./permissions')
const sirv = require('sirv')
const compress = require('compression')()
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

server.use(compress, sirv('public'))

server.start(() =>
  console.log(`Server is running`)
)
