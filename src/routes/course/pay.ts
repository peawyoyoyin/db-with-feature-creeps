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

const getStudentFee = async (studentID, semesterID) => {
  const semesterQueryResult = await db.semester.query(`
    SELECT semesterNumber FROM semester
    WHERE semester.id = ?
  `,
  [semesterID])
  const semesterNumber = semesterQueryResult[0].semesterNumber
  console.log(`semesterID ${semesterID} has semesterNumber ${semesterNumber}`)
  const result = await db.groupYearRelation.query(`
    SELECT fee, summerFee FROM student
    JOIN group_year_relation
    ON student.studentGroupGroupID = group_year_relation.studentGroupGroupID AND student.yearYear = group_year_relation.yearYear
    WHERE student.studentID = ?
  `,
  [studentID])
  if(result.length === 0) {
    throw 'fee not found'
  }
  if(semesterNumber === 3) {
    return result[0].summerFee
  }
  return result[0].fee
}

const getPaymentTransactionID = async (studentID, semesterID) => {
  const result = await db.enrollmentFeePayment.query(`
    SELECT enrollment_fee_payment.transactionID FROM enrollment_fee_payment
    WHERE enrollment_fee_payment.payerStudentID = ? AND enrollment_fee_payment.semesterId = ?
  `,
  [studentID, semesterID])
  if(result.length === 0) {
    return null
  } else {
    return result[0].transactionID
  }
}

router.get('/', async (req: any, res) => {
  const semesters = await getAllSemesters()
  const { studentID } = req.user
  const { semester } = req.query
  let fee, err, transactionID, payment
  if(semester !== undefined && semester !== '') {
    try {
      fee = await getStudentFee(studentID, semester)
    } catch(e) {
      err = e
    }
    payment = {
      semester,
      studentID
    }
    transactionID = await getPaymentTransactionID(studentID, semester)
  }
  res.render('course/pay', { title: 'Pay Fee', semesters, fee, err, transactionID, payment })
})

const pay = async (studentID, semesterID) => {
  await db.enrollmentFeePayment.query(`
    INSERT INTO enrollment_fee_payment
    (amount, payerStudentID, semesterId)
    VALUES
    (100, ?, ?)
  `,
  [studentID, semesterID])
}

router.post('/', async (req, res) => {
  await pay(req.body.studentID, req.body.semesterID)
  res.redirect('pay')
})

export default router
