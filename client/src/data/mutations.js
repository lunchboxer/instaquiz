import gql from 'graphql-tag'
import { CourseFields, SessionFields, QuestionFields } from './fragments'

// Auth

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        username
        name
        role
      }
    }
  }
`

export const SIGNUP = gql`
  mutation Signup($username: String!, $name: String!, $password: String!) {
    signup(username: $username, name: $name, password: $password) {
      token
      user {
        id
        username
        name
        role
      }
    }
  }
`

// Courses

export const CREATE_COURSE = gql`
  mutation CreateCourse($name: String!, $code: String!, $termId: ID!) {
    createCourse(name:$name, code: $code, termId: $termId){ 
      ...CourseFields
    }
  }
  ${CourseFields}
`

export const DELETE_COURSE = gql`
  mutation DeleteCourse($id: ID!) {
    deleteCourse(id: $id){ 
      id
    }
  }
`

export const ADD_STUDENT_TO_COURSE = gql`
  mutation ($id: ID!, $code: String!){
    addStudentToCourse(id: $id, code: $code ) {
      ...CourseFields
    }
  }
  ${CourseFields}
`

export const ADD_TEACHER_TO_COURSE = gql`
  mutation ($id: ID!, $courseId: ID!){
    addTeacherToCourse(id: $id, courseId: $courseId ) {
      ...CourseFields
    }
  }
  ${CourseFields}
`

export const REMOVE_TEACHER_FROM_COURSE = gql`
  mutation ($id: ID!, $courseId: ID!){
    removeTeacherFromCourse(id: $id, courseId: $courseId ) {
      ...CourseFields
    }
  }
  ${CourseFields}
`

// Terms

export const CREATE_TERM = gql`
  mutation CreateTerm($startDate: DateTime!, $endDate: DateTime!, $name: String!) {
    createTerm(startDate: $startDate, endDate: $endDate, name: $name) {
      id
      startDate
      endDate
      name
      courses {
        id
      }
    }
  }
`

// Sessions

export const CREATE_SESSION = gql`
  mutation CreateSession($startsAt: DateTime!, $endsAt:DateTime!, $courseId:ID!) {
    createSession(startsAt:$startsAt, endsAt:$endsAt, courseId:$courseId) {
      ...SessionFields
    }
  }
  ${SessionFields}
`

// Question

export const CREATE_QUESTION = gql`
  mutation CreateQuestion($text: String!, $sessionId: ID!, $order: Int){
    createQuestion(text: $text, sessionId: $sessionId, order: $order) {
      ...QuestionFields
    }
  }
  ${QuestionFields}
`

export const DELETE_QUESTION = gql`
  mutation deleteQuestion($id: ID!){
    deleteQuestion(id: $id) {
      id
    }
  }
`

export const ASK_QUESTION = gql`
  mutation AskQuestion($id: ID!){
    askQuestion(id: $id){
      ...QuestionFields
    }
  }
  ${QuestionFields}`

//  Answer

export const CREATE_ANSWER = gql`
  mutation CreateAnswer($text: String!, $questionId: ID!){
    createAnswer(text: $text, questionId: $questionId) {
      id
      text
      responses {
        id
      }
    }
  }
`

export const DELETE_ANSWER = gql`
  mutation DeleteAnswer($id: ID!){
    deleteAnswer(id: $id) {
      id
    }
  }
`

export const ANSWER_QUESTION = gql`
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
        id
      }
  }
`
