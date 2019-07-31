const { auth } = require('./auth')
const { term } = require('./term')
const { course } = require('./course')
const { session } = require('./session')
const { question } = require('./question')

exports.Mutation = {
  ...auth,
  ...term,
  ...course,
  ...session,
  ...question
}
