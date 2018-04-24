import * as express from 'express'
import db from '~/db'

const router = express.Router()

router.get('/', async (req, res) => {
  const { studentID } = req.query
  let studentData = undefined
  const studentRows = await db.student.query(
    `
      SELECT studentID, firstName, lastName FROM student 
      WHERE studentID = ? 
    `,
    [studentID]
  )
  if (studentID === undefined || studentID === '') studentData = null
  else {
    if (studentRows.length === 1) {
      const student = studentRows[0]
      console.log(student)
      const { studentID, firstName, lastName } = student
      studentData = {
        info: {
          studentID,
          firstName,
          lastName
        },
        subjects: [
          {
            courseID: '2110217',
            courseName: 'SOME SUBJ',
            section: 1
          },
          {
            courseID: '2110224',
            courseName: 'SOME SUBJ LAB',
            section: 33
          }
        ]
      }
    } else {
      studentData = {
        info: {
          studentID,
          notFound: true
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
})

export default router
