const { auth } = require('./auth')
const { term } = require('./term')
const { course } = require('./course')
const { session } = require('./session')
const { question } = require('./question')
const { answer } = require('./answer')
const { response } = require('./response')

exports.Mutation = {
  ...auth,
  ...term,
  ...course,
  ...session,
  ...question,
  ...answer,
  ...response
}
