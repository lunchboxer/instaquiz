exports.call = {
  async callStudent (_, { sessionId }, { prisma }) {
    // the goal is to not randomly choose one student five times and other never.
    // so we'll call the students who have been called on the least.

    let studentId
    let students

    const allStudentsThisCourse = await prisma.session({ id: sessionId }).course()
      .students({ where: { absences_none: { session: { id: sessionId } } } })

    if (!allStudentsThisCourse || allStudentsThisCourse.length === 0) {
      throw new Error('This course has no students enrolled.')
    }
    // find all the students who have been called this semester in this course
    const calledByCourse = await prisma.session({ id: sessionId }).course().sessions().calls().student()
    if (calledByCourse && calledByCourse.length > 0) {
      const calledStudentIds = calledByCourse.map(course => course.calls).flat().map(item => item.student.id)
      const uniqueCalledStudentIds = [...new Set(calledStudentIds)]
      const notCalledStudents = allStudentsThisCourse.filter(s => {
        return !uniqueCalledStudentIds.includes(s.id)
      })
      // pick a student from those who've never been called
      if (notCalledStudents.length > 0) {
        studentId = notCalledStudents[Math.floor(Math.random() * notCalledStudents.length)].id
      } else {
        // if there are no students who haven't been called then find the ones
        // who've been calle dthe least and pick one of them
        const studentsWithCallCounts = calledStudentIds.reduce((acc, studentId) => {
          acc[studentId] ? acc[studentId]++ : acc[studentId] = 1
          return acc
        }, {})
        const minimumCalls = Object.keys(studentsWithCallCounts).reduce((min, student) => {
          if (!min || studentsWithCallCounts[student] < min) {
            min = studentsWithCallCounts[student]
          }
          return min
        }, 0)
        const leastCalledStudents = Object.keys(studentsWithCallCounts).filter(id => {
          return studentsWithCallCounts[id] === minimumCalls
        })
        students = leastCalledStudents
      }
    } else {
      // none of the students have been called, so just pick one
      students = allStudentsThisCourse.map(s => s.id)
    }
    // pick a student to call
    studentId = students[Math.floor(Math.random() * students.length)]

    // call that student
    return prisma.createCall({
      student: {
        connect: {
          id: studentId
        }
      },
      session: {
        connect: {
          id: sessionId
        }
      }
    })
  },
  evaluateStudent (_, { callId, evaluation }, { prisma }) {
    return prisma.updateCall({
      where: { id: callId },
      data: { evaluation }
    })
  }
}
