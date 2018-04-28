import * as express from 'express'
import db from '~/db'
import * as check from './checkexist'

const router = express.Router()

router.get('/', async (req, res) => {
  res.render('seniorproj/exist-register', {
    title: 'Register Senior Project',
    result: [],
    errors: []
  })
})

router.post('/', async (req, res) => {
  let { sid, year, topic, supervisorTeacherID, projectID } = req.body
  let err = []
  let years = await check.getYear()
  years = years.map(i => i.year)
  try {
    if (year !== undefined) {
      err.push(check.yearExists(year))
    }

    if (supervisorTeacherID !== undefined && supervisorTeacherID !== '') {
      let check_teacher = await db._connection.manager.query(
        `SELECT EXISTS(
        SELECT 1 FROM teacher WHERE teacherID=? LIMIT 1)`,
        [supervisorTeacherID]
      )
      console.log('check teacher', check_teacher)
      if (Object.values(check_teacher[0])[0] === '0')
        err.push('There is no teacher')
    }

    if (sid !== undefined && sid !== '') {
      console.log('sid ', sid)
      let check_student = await db._connection.manager.query(
        `
        SELECT * FROM student WHERE studentID=? LIMIT 1`,
        [sid]
      )
      console.log(check_student)
      if (check_student.length === 0) err.push('There is no student')
      else {
        check_student = check_student[0]
        if (check_student.seniorProjectProjectID !== null) {
          err.push('This student already have a project')
        }
      }
    }

    if (err.length !== 0) throw err

    let id
    let teacher = null
    if (projectID === undefined) {
      if (topic === '') throw ['Please fill in Topic field']
      let insert_project = await db._connection.manager.query(
        `INSERT INTO senior_project
        (topic,year) VALUES (?,?);
        `,
        [topic, year]
      )
      let query_id = await db._connection.query(`SELECT LAST_INSERT_ID();`)
      id = Object.values(query_id[0])[0]
    } else {
      let find_project = await db._connection.manager.query(
        `SELECT 
        supervisorTeacherID FROM senior_project 
        WHERE projectID=? LIMIT 1`,
        [projectID]
      )
      if (find_project.length === 0) throw ['There is no project']
      id = projectID
      teacher = find_project[0].supervisorTeacherID
    }

    if (supervisorTeacherID !== undefined && supervisorTeacherID !== '') {
      if (teacher !== null) throw ['This project already has supervisor']
      await db._connection.manager.query(
        `UPDATE senior_project 
      SET supervisorTeacherID=?
      WHERE projectID=?
      `,
        [supervisorTeacherID, id]
      )
    }
    if (sid !== undefined && sid !== '') {
      let insert_student = await db._connection.manager.query(
        `UPDATE student
      SET seniorProjectProjectID=?
      WHERE studentID=?
      `,
        [id, sid]
      )
    }
    res.render('seniorproj/register', {
      title: 'Register Senior Project',
      years,
      result: [`Your project ID is ${id}`],
      errors: []
    })
  } catch (errors) {
    res.render('seniorproj/exist-register', {
      title: 'Register Senior Project',
      years,
      result: [],
      errors
    })
  }
})

export default router
