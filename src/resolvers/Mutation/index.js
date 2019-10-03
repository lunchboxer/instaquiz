const { auth } = require('./auth')
const { term } = require('./term')
const { course } = require('./course')
const { session } = require('./session')
const { question } = require('./question')
const { answer } = require('./answer')
const { response } = require('./response')
const { call } = require('./call')
const { absence } = require('./absence')

exports.Mutation = {
  ...auth,
  ...term,
  ...course,
  ...session,
  ...question,
  ...answer,
  ...response,
  ...call,
  ...absence
}
