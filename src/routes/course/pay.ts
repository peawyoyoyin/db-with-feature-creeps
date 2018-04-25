import * as express from 'express'
import db from '~/db'

const router = express.Router()

const getAllSemesters = async () => {
  const result = await db.semester.query(`
    SELECT id, semesterNumber, yearYear FROM semester
  `)
  return result.map(row => ({
    id: row.id,
    number: row.semesterNumber,
    name: `${row.semesterNumber}/${row.yearYear}`
  }))
}

const getStudentFee = async (studentID, semesterNumber) => {
  const result = await db.groupYearRelation.query(`
    SELECT fee, summerFee FROM student
    JOIN group_year_relation
    ON student.studentGroupGroupID = group_year_relation.studentGroupGroupID AND student.year = group_year_relation.yearYear
    WHERE student.studentID = ?
  `,
  [studentID])
  if(!result) {
    throw 'fee not found'
  }
  if(semesterNumber === 3) {
    return result[0].summerFee
  }
  return result[0].fee
}
router.get('/', async (req, res) => {
  const semesters = await getAllSemesters()
  const { studentID, semester } = req.query
  let fee, err
  if(studentID !== '' && semester !== '') {
    try {
      fee = await getStudentFee(studentID, semester)
    } catch(e) {
      err = e
    }
  }
  res.render('course/pay', { title: 'Pay Fee', semesters, fee, err })
})

export default router
