const { GraphQLServer } = require("graphql-yoga");
const { prisma } = require("./generated/prisma-client");
const { resolvers } = require("./resolvers");
const { permissions } = require("./permissions");

const server = new GraphQLServer({
  typeDefs: "src/schema.graphql",
  resolvers,
  middlewares: [permissions],
  context: request => {
    return {
      ...request,
      prisma
    };
  }
});

const options = { port: 4001 };

server.start(options, () =>
  console.log(`Server is running on http://localhost:${options.port}`)
);
