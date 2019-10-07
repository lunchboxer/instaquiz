const { prisma } = require('./generated/prisma-client')
const fs = require('fs')

const fragmentWithCourses = `
fragment UserWithCoursesAttending on User {
  id
  coursesAttending {
    id
  }
}`

const fragmentWithResponses = `
fragment AnswerWithResponse on Answer {
  id
  responses {
    id
  }
}`

const fragmentDetailedResponse = `
fragment ResponseDetail on Response {
  id
  session {
    id
  }
  question {
    id
  }
  student {
    id
  }
}`

const file = 'studentConnectionsAppend.js'
const file2 = 'answerConnectionsAppend.js'
const file3 = 'ResponseConnectionsAppend.js'
const headingString = `const { prisma } = require('./src/generated/prisma-client-remote')
    
const main = async () => {\n`

const exportStudentConnections = async () => {
  fs.writeFileSync(file, headingString)
  const allUsers = await prisma.users({ where: { coursesAttending_some: {} } }).$fragment(fragmentWithCourses)
  const stream = fs.createWriteStream(file, { flags: 'a' })

  allUsers.forEach(user => {
    stream.write(`await prisma.updateUser({
    where: {id: '${user.id}'},
    data: {coursesAttending: {connect: ${user.coursesAttending.map(course => `{id: '${course.id}'}`).join(', ')}}}
    })
  `)
  })
  stream.write('\n }\n main()\n')
  stream.end()
}

const exportAnswerConnections = async () => {
  fs.writeFileSync(file2, headingString)
  const allAnswers = await prisma.answers({ where: { responses_some: {} } }).$fragment(fragmentWithResponses)
  const stream = fs.createWriteStream(file2, { flags: 'a' })

  allAnswers.forEach((answer, index) => {
    stream.write(`try {
      await prisma.updateAnswer({
    where: {id: '${answer.id}'},
    data: {responses: {connect: [${answer.responses.map(response => `{id: '${response.id}'}`).join(', ')}]}}
    })
  } catch (error) {
    console.error(error)
  } finally {
    console.log('${index + 1} / ${allAnswers.length} ||| ${answer.id} - ${answer.responses.length}')
  }
  `)
  })
  stream.write('\n }\n main()\n')
  stream.end()
}

const exportResponseConnections = async () => {
  fs.writeFileSync(file3, headingString)
  const allResponses = await prisma.responses().$fragment(fragmentDetailedResponse)
  const stream = fs.createWriteStream(file3, { flags: 'a' })

  allResponses.forEach((response, index) => {
    stream.write(`try {
      await prisma.updateResponse({
    where: {id: '${response.id}'},
    data: {
      student: {connect: {id: '${response.student.id}'}},
      session: {connect: {id: '${response.session.id}'}},
      question: {connect: {id: '${response.question.id}'}}
    }
    })
  } catch (error) {
    console.error(error)
  } finally {
    console.log('${index + 1} / ${allResponses.length} || id: ${response.id}')
  }
  `)
  })
  stream.write('\n }\n main()\n')
  stream.end()
}

exportStudentConnections()
exportAnswerConnections()
exportResponseConnections()
