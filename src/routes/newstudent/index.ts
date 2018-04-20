import * as express from 'express'
import db from '~/db'
import { Student } from '~/entity/student'

const router = express.Router()

router.get('/', async (req, res) => {
  // query for all departments?
  // console.log(await db.departments.find())
  const departments = await db.departments.find({
    relations: ['faculty']
  })
  console.log(departments)
  res.render('newstudent/new-student', {
    title: 'Register New Student',
    departments,
    errors: []
  })
})

router.post('/', async (req, res) => {
  const departments = await db.departments.find({
    relations: ['faculty']
  })
  const {
    studentID,
    firstName,
    lastName,
    citizenID,
    countryCode: nationality,
    year,
    department
  } = req.body
  try {
    const newStudent = new Student({
      studentID,
      firstName,
      lastName,
      citizenID,
      nationality,
      department,
      year: parseInt(year)
    })
    await db.student.save(newStudent)
    res.redirect('/')
  } catch (e) {
    res.render('newstudent/new-student', {
      title: 'Register New Student',
      departments,
      errors: e
    })
  }
})

export default router
