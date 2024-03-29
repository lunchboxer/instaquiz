export const UserFields = /* GraphQL */`
  fragment UserFields on User {
    id
    username
    name
    role
    passwordIsTemporary
    coursesTeaching {
      id
      name
    }
    coursesAttending {
      id
      name
    }
  }
`

export const CourseFields = /* GraphQL */`
  fragment CourseFields on Course {
    id
    name
    code
    term {
      id
      name
    }
    teachers {
      id
      name
    }
    students {
      id
    }
  }`

export const SessionFields = /* GraphQL */`
  fragment SessionFields on Session {
    id
    startsAt
    endsAt
    order
    course {
      id
      name
      teachers {
      id
    }
    }
  }`

export const QuestionFields = /* GraphQL */`
  fragment QuestionFields on Question {
    id
    text
    order
    asked
    answers {
      id
      text
    }
    session {
      id
    }
  }`

export const ResponseFields = /* GraphQL */`
  fragment ResponseFields on Response {
    id
     question { 
       id
     }
     answer {
       id
       text
     }
  }
`
