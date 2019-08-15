import gql from 'graphql-tag'
import { CourseFields, SessionFields, QuestionFields, ResponseFields } from './fragments'

export const ME = gql`
{
  me {
    username
    name
    role
    id
    coursesTeaching {
      id
      name
    }
    coursesAttending {
      id
      name
    }
  }
}`

export const GET_MY_SESSIONS = gql`
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

export const SESSION = gql`
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

export const TERMS_AND_ALL = gql`
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

export const TERM = gql`
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

export const TERMS = gql`
{
  terms(orderBy: startDate_ASC) {
    id
    name
  }
}`

export const COURSE_SESSIONS = gql`
  query CourseSessions($courseId: ID!){
    sessions(orderBy: startsAt_ASC, where : { course: {id: $courseId}}) {
      ...SessionFields
    }
  }
${SessionFields}`

export const COURSE = gql`
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

export const COURSES = gql`
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

export const QUESTION = gql`
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

export const ACTIVE_TEACHER_SESSION = gql`
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

export const RESPONSES = gql`
  query Responses($questionId: ID!){
    responses(where:{question:{id: $questionId}}){
      ...ResponseFields
    }
  }
${ResponseFields}`

export const QUESTION_SUB = gql`
  subscription Questions($sessionId: ID!) {
  questions(sessionId: $sessionId) {
    ...QuestionFields
  }
}
${QuestionFields}`

export const RESPONSE_SUBSCRIPTION = gql`
  subscription Reponses($questionId: ID!) {
    responses(questionId: $questionId) {
      ...ResponseFields
    }
  }
${ResponseFields}`
