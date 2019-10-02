const { Query } = require('./Query')
const { Mutation } = require('./Mutation')
const { Course } = require('./Course')
const { User } = require('./User')
const { Term } = require('./Term')
const { Session } = require('./Session')
const { Question } = require('./Question')
const { Answer } = require('./Answer')
const { Response } = require('./Response')
const { Call } = require('./Call')
const { Subscription } = require('./Subscription')

exports.resolvers = {
  Query,
  Mutation,
  Course,
  User,
  Term,
  Session,
  Question,
  Answer,
  Response,
  Call,
  Subscription
}
