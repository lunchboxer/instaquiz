export const UserFields = /* GraphQL */`
  fragment UserFields on User {
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

export const AllSessionFields = /* GraphQL */`
  fragment AllSessionFields on Session {
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
`

export const QuestionFields = /* GraphQL */`
  fragment QuestionFields on Question {
    id
    text
    order
    asked
    publishResponses
    showInViewer
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
    createdAt
    answer {
      id
    }
    student {
      id
    }
  }
`

export const AbsenceFields = /* GraphQL */`
  fragment AbsenceFields on Absence {
    id
    student {
       id
       name
       pinyinName
    }
  }
`
