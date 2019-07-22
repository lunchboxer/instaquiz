const { Query } = require('./Query')
const { Mutation } = require('./Mutation')
const { Course } = require('./Course')
const { User } = require('./User')
const { Term } = require('./Term')

exports.resolvers = {
  Query,
  Mutation,
  Course,
  User,
  Term
}
