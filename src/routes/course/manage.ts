import * as express from 'express'
import db from '~/db'

const router = express.Router()

async function getStudent(studentID) {
  const studentRows = await db.student.query(
    `
      SELECT studentID, firstName, lastName FROM student 
      WHERE studentID = ? 
    `,
    [studentID]
  )
  if (studentRows.length === 1) {
    return studentRows[0]
  }
  throw new Error('Student not found')
}

async function getSectionEnrolled() {
  const sectionRows = await db.section.query(
    `
      SELECT courseID, name as courseName, sectionNumber as section FROM study
      JOIN section ON study.sectionId = section.id
      JOIN course_instance ON section.courseInstanceId = course_instance.id
      JOIN course ON course_instance.courseCourseID = course.courseID
    `
  )
  if (sectionRows.length === 0) {
    throw new Error('Cannot found section enrolled')
  }
  return sectionRows
}

router.get('/', async (req, res) => {
  const { studentID } = req.query
  let studentData = undefined
  if (studentID === undefined || studentID === '') studentData = null
  else {
    try {
      const student = await getStudent(studentID)
      console.log(student)
      const subjects = await getSectionEnrolled()
      const { firstName, lastName } = student
      studentData = {
        info: {
          studentID,
          firstName,
          lastName
        },
        subjects
      }
    } catch (e) {
      studentData = {
        info: {
          studentID,
          notFound: e.message
        }
      }
    }
  }

  res.render('course/manage', {
    title: 'Manage Courses',
    studentData,
    studentID
  })
})

router.post('/', (req, res) => {
  console.log(req.body)
  res.redirect('/')
  db.study.query(
    `
    DELETE S FROM study S
    JOIN section ON S.sectionId = section.id
    JOIN course_instance ON section.courseInstanceId = course_instance.id
    JOIN course ON course_instance.courseCourseID = course.courseID
    WHERE courseID = ? AND S.studentStudentID = ?;
  `,
    [2110201, 5831645895]
  )
})

export default router
