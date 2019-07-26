const { auth } = require('./auth')
const { term } = require('./term')
const { course } = require('./course')
const { session } = require('./session')

exports.Mutation = {
  ...auth,
  ...term,
  ...course,
  ...session
}
