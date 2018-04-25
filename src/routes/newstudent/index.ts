import * as express from 'express'
import db from '~/db'
import { Student } from '~/entity/student'
import { AcademicYear } from '~/entity/academic-year';

const router = express.Router()

router.get('/', async (req, res) => {
  const departments = await db.departments.find({
    relations: ['faculty']
  })
  const yearsRaw = await db.academicYear.query(`
    SELECT year FROM academic_year
  `)
  const years = yearsRaw.map(row => row.year)
  console.log(departments)
  res.render('newstudent/new-student', {
    title: 'Register New Student',
    departments,
    errors: [],
    years
  })
})

router.post('/', async (req, res) => {
  const departments = await db.departments.find({
    relations: ['faculty']
  })
  const yearsRaw = await db.academicYear.query(`
    SELECT year FROM academic_year
  `)
  const years = yearsRaw.map(row => row.year)
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
    })
    newStudent.year = new AcademicYear({
      year: parseInt(year)
    })
    await db.student.save(newStudent)
    res.redirect('/')
  } catch (e) {
    res.render('newstudent/new-student', {
      title: 'Register New Student',
      departments,
      errors: e,
      years
    })
  }
})

export default router
