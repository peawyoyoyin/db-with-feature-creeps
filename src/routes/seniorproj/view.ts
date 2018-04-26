import * as express from 'express'
import db from '~/db'

const router = express.Router()

async function getStudent(studentID) {
  const rawStudent = await db.student.query(
    `
    SELECT studentID, firstName, lastName, seniorProjectProjectID FROM student 
    WHERE studentID = ?
  `,
    [studentID]
  )
  if (rawStudent.length === 0) return null
  return rawStudent[0]
}

async function getProject(projectID) {
  const rawProject = await db.seniorProject.query(`
    SELECT topic, year, firstName, lastName FROM senior_project
    WHERE projectID = ?
  `)
  if (rawProject.length === 0) return null
  const {topic, year, firstName, lastName} = rawProject[0]
  return {
    topic,
    year,
    supervisor: `${firstName} ${lastName}`
  }
}

router.get('/', async (req, res) => {
  const { studentID } = req.query
  const student = await getStudent(studentID)
  const project = {
    topic: 'Machine Learning & Blockchain Innovative Disruption',
    supervisor: 'Attawit Sudsang',
    year: '2561'
  }
  const evaluations = [
    {
      comment: 'Good',
      grade: 80,
      teacherFullName: 'Attawit Sudsang',
      type: 'Midterm Presentation'
    },
    {
      comment: 'Ok',
      grade: 70,
      teacherFullName: 'Attawit Sudsang',
      type: 'Final Presentation'
    }
  ]
  res.render('seniorproj/view', {
    studentID,
    student,
    project,
    evaluations
  })
})

export default router
