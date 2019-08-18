import { CourseFields, SessionFields, QuestionFields, ResponseFields, UserFields } from './fragments'

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

export const TERMS_AND_ALL = /* GraphQL */`
{
  terms(orderBy: startDate_ASC) {
    id
    startDate
    endDate
    name
    courses {
      id
      name
    }
  }
}
`

export const TERM = /* GraphQL */`
query Term($id: ID!){
  term(id:$id) {
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

export const TERMS = /* GraphQL */`
{
  terms(orderBy: startDate_ASC) {
    id
    name
  }
}`

export const COURSE_SESSIONS = /* GraphQL */`
  query CourseSessions($courseId: ID!){
    sessions(orderBy: startsAt_ASC, where : { course: {id: $courseId}}) {
      ...SessionFields
    }
  }
${SessionFields}`

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

export const COURSES = /* GraphQL */`
query Courses {
  courses{
    id
    name
    term {
      name
      id
      startDate
    }
    teachers {
      id
      name
    }
    students {
      id
    }
  }
}`

export const QUESTION = /* GraphQL */`
query Question($id: ID!){
  question(id: $id){
    id
    text
    order
    answers {
      id
      text
      responses {
        id
        student {
          id
        }
        createdAt
      }
    }
    session {
      id
      order
      course {
        id
        name
        term {
          id
          name
        }
      }
    }
  }
}`

export const ACTIVE_TEACHER_SESSION = /* GraphQL */`
  query Session($id: ID!){
    session(id: $id){
      id
      questions {
        id
        text
        order
        asked
        answers {
          id
          text
        }
      }
    }
  }
`

export const RESPONSES = /* GraphQL */`
  query Responses($questionId: ID!){
    responses(where:{question:{id: $questionId}}){
      ...ResponseFields
    }
  }
${ResponseFields}`

export const QUESTION_SUB = /* GraphQL */`
subscription Questions($sessionId: ID!) {
  questions(sessionId: $sessionId) {
    ...QuestionFields
  }
}
${QuestionFields}`

export const RESPONSE_SUBSCRIPTION = /* GraphQL */`
subscription Reponses($questionId: ID!) {
  responses(questionId: $questionId) {
      ...ResponseFields
  }
}
${ResponseFields} `
