import { CourseFields, UserFields, ResponseFields } from './fragments'

// Auth

export const LOGIN = /* GraphQL */`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        ...UserFields
      }
    }
  }
  ${UserFields}
`

export const SIGNUP = /* GraphQL */`
  mutation Signup($username: String!, $name: String!, $password: String!) {
    signup(username: $username, name: $name, password: $password) {
      token
      user {
       ...UserFields
      }
    }
  }
  ${UserFields}
`

// Courses

export const ADD_STUDENT_TO_COURSE = /* GraphQL */`
  mutation ($id: ID!, $code: String!){
    addStudentToCourse(id: $id, code: $code ) {
      ...CourseFields
    }
  }
  ${CourseFields}
`
//  Response

export const ANSWER_QUESTION = /* GraphQL */`
  mutation AnswerQuestion(
    $studentId: ID!
    $questionId: ID!
    $answerId: ID!
    $sessionId: ID!) {
    answerQuestion(
      studentId: $studentId
      questionId: $questionId
      answerId: $answerId
      sessionId: $sessionId) {
        ...ResponseFields
      }
  }
  ${ResponseFields}
`
