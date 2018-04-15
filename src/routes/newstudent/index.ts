import * as express from 'express'
import { validate } from 'class-validator'
import db from '~/db'
import { Student } from '~/entity/student'

const router = express.Router()

router.get('/', async (req, res) => {
  // query for all departments?
  res.render('newstudent/new-student', {
    title: 'Register New Student',
    departments: ['Computer Engineering', 'Chemical Engineering']
  })
})

router.post('/', async (req, res) => {
  console.log('createStudent', req.body)
  const {
    studentID,
    firstName,
    lastName,
    citizenID,
    countryCode: nationality,
    year
  } = req.body
  try {
    const newStudent = new Student({
      studentID,
      firstName,
      lastName,
      citizenID,
      nationality,
      year
    })
    await db.student.save(newStudent)
    res.redirect('/')
  } catch (e) {
    // console.log(e)
    res.render('newstudent/new-student', {
      title: 'Register New Student',
      departments: ['Computer Engineering', 'Chemical Engineering'],
      error: e.message
    })
  }
})

export default router
