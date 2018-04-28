import * as express from 'express'
import db from '~/db'
import { Student } from '~/entity/student'
import { AcademicYear } from '~/entity/academic-year';

const router = express.Router()

async function getAllDepartments() {
  const departments = await db.departments.query(`
    SELECT * FROM department
  `)
  return departments
}

async function getAllYears() {
  const years = await db.semester.query(`
    SELECT year FROM academic_year ORDER BY year DESC
  `)
  return years.map(year => year.year)
}

router.get('/', async (req, res) => {
  const departments = await getAllDepartments()
  const years = await getAllYears()
  console.log(departments)
  res.render('newstudent/new-student', {
    title: 'Register New Student',
    departments,
    errors: [],
    years
  })
})

router.post('/', async (req, res) => {
  const departments = await getAllDepartments()  
  const years = await getAllYears()  
  const {
    studentID,
    password,
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
      password,
      firstName,
      lastName,
      citizenID,
      nationality,
      department
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
