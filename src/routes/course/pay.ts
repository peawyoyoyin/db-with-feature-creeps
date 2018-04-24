import * as express from 'express'
import db from '~/db'

const router = express.Router()

const getAllSemesters = async () => {
  const result = await db.semester.query(`
    SELECT id, semesterNumber, yearYear FROM semester
  `)
  return result.map(row => ({
    id: row.id,
    name: `${row.semesterNumber}/${row.yearYear}`
  }))
}

const getStudentFee = async (studentID, semester) => {
  const result = await db.groupYearRelation.query(`
    SELECT fee, studentID, year FROM student
    JOIN group_year_relation 
    ON student.studentGroupGroupID = group_year_relation.studentGroupGroupID AND student.year = group_year_relation.yearYear
    WHERE studentID = ?
  `,
  [studentID])
  return result
}
router.get('/', async (req, res) => {
  const semesters = await getAllSemesters()
  const { studentID, semester } = req.query
  let fee
  if(studentID !== '' && semester !== '') {
    fee = getStudentFee(studentID, semester)    
  }
  res.render('course/pay', { title: 'Pay Fee', semesters, fee: 200 })
})

export default router
