import { CourseFields, SessionFields, QuestionFields, UserFields, ResponseFields } from './fragments'

export const ME = /* GraphQL */`
{
  me {
    ...UserFields
  }
}
${UserFields}`

export const GET_MY_SESSIONS = /* GraphQL */`
query GetMYSessions($id: ID!, $now: DateTime!, $latest: DateTime!){
  sessions( orderBy: startsAt_ASC, where: { AND: [ 
    { OR: [
      { course: { teachers_some: { id: $id } }},
      { course: { students_some: { id: $id } }}
    ]},
    { endsAt_gte: $now, endsAt_lt: $latest }
  ]}){
    ...SessionFields
  }
}
${SessionFields}`

export const SESSION = /* GraphQL */`
query Session($id: ID!){
  session(id: $id){
    id
    startsAt
    endsAt
    order
    course {
      id
      name
      term {
        id
        name
      }
    }
    questions {
      id
      text
      order
    }
  }
}`

export const CURRENT_TERM = /* GraphQL */`
query CurrentTerm($now: DateTime!){
  terms(where: {startDate_lt: $now, endDate_gt: $now}) {
    id
    startDate
    endDate
    name
    courses {
      ...CourseFields
    }
  }
}
${CourseFields}`

export const COURSE = /* GraphQL */`
  query Course($id: ID!){
    course(id: $id){
      ...CourseFields
      sessions {
        ...SessionFields
      }
    }
  }
  ${SessionFields}
  ${CourseFields}`

export const QUESTION_SUB = /* GraphQL */`
subscription Questions($sessionId: ID!) {
  questions(sessionId: $sessionId) {
    ...QuestionFields
  }
}
${QuestionFields}`

export const MY_SESSION_RESPONSES_AND_QUESTIONS = /* GraphQL */ `
 query ResponsesAndQuestions($studentId: ID!, $sessionId: ID!){
   questions(first: 1, where: {asked_not:null, session: {id: $sessionId}}, orderBy: asked_DESC) {
    ...QuestionFields
   }
   responses(where: {student: {id: $studentId}, session: {id: $sessionId}}) {
     ...ResponseFields
   }
 }
 ${QuestionFields}
 ${ResponseFields}`
