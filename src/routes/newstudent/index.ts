import * as express from 'express'
import db from '~/db'

const router = express.Router()

router.get('/', (req, res) => {
  // query for all departments?
  res.render('newstudent/new-student', { 
    title: 'Register New Student',
    departments: [
      'Computer Engineering',
      'Chemical Engineering'
    ]
  })
})

router.post('/', (req, res) => {
  console.log('createStudent', req.body)
  const { studentID, firstName, lastName, citizenID, countryCode: nationality, year } = req.body
  db.student.insert({
    studentID,
    firstName,
    lastName,
    citizenID,
    nationality,
    year
  })
  res.redirect('/')
})

export default router
