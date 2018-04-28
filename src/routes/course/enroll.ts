import * as express from 'express'
import db from '~/db'
import { CourseInstance } from '~/entity/course-instance'
import { AdvancedConsoleLogger } from 'typeorm'

const router = express.Router()

interface EnrollData {
  studentID: string
  courseID: any
  courseSectNum: any
  semesterId: number
}

async function handleEnrolls(body: EnrollData) {
  let { studentID, courseID, courseSectNum, semesterId } = body
  if (typeof courseID === 'string') {
    courseID = [courseID]
    courseSectNum = [courseSectNum]
  }
  const coursePromises = courseID.map(id =>
    getCourseInstancePromise(id, semesterId)
  )

  const courses = await Promise.all(coursePromises)

  const e = courses.filter(c => c instanceof Error).map((e: Error) => e.message)
  if (e.length > 0) return e

  const sectionPromises = courses.map((course: any, index) => {
    const { id } = course
    const sectionNumber = courseSectNum[index]
    return getSectionPromise(id, sectionNumber, courseID[index])
  })

  const sections = await Promise.all(sectionPromises)
  const e2 = sections.filter(s => s instanceof Error).map(e => e.message)
  if (e2.length > 0) return e2

  const insertPromises = sections.map(section => {
    const { id: sectionID, courseInstanceId } = section
    return insertStudyPromise(studentID, sectionID, courseInstanceId)
  })
  const results = await Promise.all(insertPromises)
  const e3 = results.filter(r => r instanceof Error).map(e => e.message)
  if (e3.length > 0) return e3

  return []
}

async function getCourseInstancePromise(courseID: string, semesterId: number) {
  const rows = await db.courseInstance.query(
    `
      SELECT * FROM course_instance
      WHERE courseCourseID = ? AND semesterId = ?
    `,
    [courseID, semesterId]
  )
  if (rows.length === 0) {
    if (courseID.length === 0) return new Error(`Course id cannot be empty`)
    return new Error(`Cannot find course with id ${courseID}`)
  }
  return rows[0]
}

async function getSectionPromise(
  courseInstanceID: string,
  sectionNumber: string,
  courseID: string
) {
  const rows = await db.section.query(
    `
      SELECT * FROM section
      WHERE courseInstanceId = ? AND sectionNumber = ?
    `,
    [courseInstanceID, sectionNumber]
  )
  if (rows.length === 0) {
    if (sectionNumber.length === 0) {
      return new Error(`Section number cannot be empty`)
    }
    return new Error(
      `Cannot find section ${sectionNumber} of course ${courseID}`
    )
  }
  return rows[0]
}

async function insertStudyPromise(studentID, sectionID, instanceID) {
  try {
    const result = await db.study.query(
      `
        INSERT INTO study (gradeLetter, studentStudentID, sectionId, instanceId)
        VALUES (?, ?, ?, ?)
      `,
      ['X', studentID, sectionID, instanceID]
    )
  } catch (e) {
    console.log('========', e.errno)
    if (e.errno === 1062) {
      return new Error('Student cannot register the same course registered')
    }
    return e
  }
}

router.get('/', (req, res) => {
  res.render('course/enroll', { title: 'Enroll Course', errors: [] })
})

router.post('/', async (req: any, res) => {
  // console.log(req.body)
  // console.log('user', req.user)
  const { studentID } = req.user
  console.log(studentID)
  const currentSemesterRows = await db.semester.query(`
    SELECT * FROM semester
    ORDER BY semester.yearYear DESC, semester.semesterNumber DESC
    LIMIT 1
  `)
  const { id: currentSemesterID } = currentSemesterRows[0]
  console.log(currentSemesterID)
  const studentRows = await db.student.query(
    `
    SELECT * FROM student
    WHERE student.studentID = ?
  `,
    [studentID]
  )
  const errors = []
  if (studentRows.length === 0) {
    errors.push('Cannot Find Student')
  }
  const handleErrors = await handleEnrolls({
    ...req.body,
    ...req.user,
    semesterId: currentSemesterID
  })
  console.log('handleErrors', handleErrors)
  errors.splice(0, 0, ...handleErrors)
  if (errors.length > 0) {
    res.render('course/enroll', { title: 'Enroll Course', errors })
  } else {
    res.redirect('/')
  }
})

export default router
