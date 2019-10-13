import { CourseFields, SessionFields, AllSessionFields, QuestionFields, UserFields, AbsenceFields } from './fragments'

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

export const CREATE_COURSE = /* GraphQL */`
  mutation CreateCourse($name: String!, $code: String!, $termId: ID!) {
    createCourse(name:$name, code: $code, termId: $termId){ 
      ...CourseFields
    }
  }
  ${CourseFields}
`

export const DELETE_COURSE = /* GraphQL */`
  mutation DeleteCourse($id: ID!) {
    deleteCourse(id: $id){ 
      id
    }
  }
`

export const ADD_TEACHER_TO_COURSE = /* GraphQL */`
  mutation ($id: ID!, $courseId: ID!){
    addTeacherToCourse(id: $id, courseId: $courseId ) {
      ...CourseFields
    }
  }
  ${CourseFields}
`

export const REMOVE_TEACHER_FROM_COURSE = /* GraphQL */`
  mutation ($id: ID!, $courseId: ID!){
    removeTeacherFromCourse(id: $id, courseId: $courseId ) {
      ...CourseFields
    }
  }
  ${CourseFields}
`

// Terms

export const CREATE_TERM = /* GraphQL */`
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

export const CREATE_SESSION = /* GraphQL */`
  mutation CreateSession($startsAt: DateTime!, $endsAt:DateTime!, $courseId:ID!) {
    createSession(startsAt:$startsAt, endsAt:$endsAt, courseId:$courseId) {
      ...SessionFields
    }
  }
  ${SessionFields}
`

export const IMPORT_QUESTIONS = /* GraphQL */`
  mutation ImportQuestions($fromSessionId: ID!, $toSessionId: ID!) {
    importQuestions(fromSessionId: $fromSessionId, toSessionId: $toSessionId) {
      ...AllSessionFields
    }
  }
  ${AllSessionFields}
`

// Question

export const CREATE_QUESTION = /* GraphQL */`
  mutation CreateQuestion($input: QuestionCreateInput!){
    createQuestion(input: $input) {
      ...QuestionFields
    }
  }
  ${QuestionFields}
`

export const DELETE_QUESTION = /* GraphQL */`
  mutation deleteQuestion($id: ID!){
    deleteQuestion(id: $id) {
      id
    }
  }
`

export const ASK_QUESTION = /* GraphQL */`
  mutation AskQuestion($id: ID!){
    askQuestion(id: $id){
      ...QuestionFields
    }
  }
  ${QuestionFields}`

export const HIDE_QUESTION = /* GraphQL */`
mutation HideQuestion($id: ID!, $input: QuestionUpdateInput!){
  updateQuestion(id: $id, input: $input){
    ...QuestionFields
  }
}
${QuestionFields}`

//  Answer

export const CREATE_ANSWER = /* GraphQL */`
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

export const DELETE_ANSWER = /* GraphQL */`
  mutation DeleteAnswer($id: ID!){
    deleteAnswer(id: $id) {
      id
    }
  }
`

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
        id
      }
  }
`

export const CHANGE_PASSWORD = /* GraphQL */ `
  mutation ChangePassword($oldPassword: String!, $newPassword: String!) {
   changePassword (oldPassword: $oldPassword, newPassword: $newPassword){
     id
   }
  }
`

export const RESET_PASSWORD = /* GraphQL */ `
 mutation ResetPassword($username: String!) {
   resetPassword(username:$username)
 }`

export const UPDATE_USER = /* GraphQL */ `
 mutation UpdateUser ($id: ID!, $input: UserUpdateInput!) {
   updateUser (id:$id, input: $input){
    id
     username
     name
     coursesAttending {
       id
       name
       term {
         id
         name
         startDate
       }
     }
   }
 }`

export const PUBLISH_RESPONSES = /* GraphQL */ `
  mutation PublishResponses($questionId: ID!) {
    updateQuestion(id: $questionId, input: {publishResponses: true}) {
      ...QuestionFields
    }
  }
  ${QuestionFields}`

export const CALL_STUDENT = /* GraphQL */ `
  mutation CallStudent($sessionId: ID!) {
    callStudent (sessionId: $sessionId) {
      id
      student {
        id
        username
        name
        pinyinName
      }
    }
  }
`

export const EVALUATE_STUDENT = /* GraphQL */ `
  mutation EvaluateStudent($callId: ID!, $evaluation: Evaluation!) {
    evaluateStudent (callId: $callId, evaluation: $evaluation) {
      id
      student {
        id
        username
        name
      }
    }
  }
`

export const MARK_STUDENT_ABSENT = /* GraphQL */ `
 mutation MarkStudentAbsent($sessionId: ID!, $studentId: ID!) {
   markStudentAbsent (sessionId: $sessionId, studentId: $studentId){
     ...AbsenceFields
   }
 }
 ${AbsenceFields}`

export const UNMARK_STUDENT_ABSENT = /* GraphQL */ `
  mutation UnarkStudentAbsent($sessionId: ID!, $studentId: ID!) {
    unmarkStudentAbsent (sessionId: $sessionId, studentId: $studentId){
      id
    }
  }
`

export const DELETE_RESPONSE = /* GraphQL */ `
  mutation DeleteResponse($id: ID!) {
    deleteResponse (id: $id){
      id
    }
  }
`
