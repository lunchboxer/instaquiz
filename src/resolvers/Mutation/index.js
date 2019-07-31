const { auth } = require('./auth')
const { term } = require('./term')
const { course } = require('./course')
const { session } = require('./session')
const { prompt } = require('./prompt')

exports.Mutation = {
  ...auth,
  ...term,
  ...course,
  ...session,
  ...prompt
}
