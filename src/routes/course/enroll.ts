import * as express from 'express'
import db from '~/db'
import { CourseInstance } from '~/entity/course-instance'
import { AdvancedConsoleLogger } from 'typeorm'

const router = express.Router()

interface EnrollData {
  studentID: string
  courseID: string | Array<string>
  courseSectNum: string | Array<string>
  courseSectOption: string | Array<string>
  courseSectNum2: string | Array<string>
  semesterId: number
}

async function handleEnrolls(body: EnrollData) {
  const {
    studentID,
    courseID,
    courseSectNum,
    courseSectOption,
    courseSectNum2,
    semesterId
  } = body
  if (typeof courseID === 'string') {
    const course = await getCourseInstancePromise(courseID, semesterId)
    if (course instanceof Error) {
      return [course.message]
    }
    const {id: courseInstanceID} = course
    const section = await getSectionPromise(courseInstanceID, <string>courseSectNum, courseID)
    if (section instanceof Error) {
      return [section.message]
    }
    const {id: sectionID, courseInstanceId} = section
    const result = await insertStudyPromise(studentID, sectionID, courseInstanceId)
    if (result instanceof Error) {
      return [result.message]
    }
  } else {
    const coursePromises = courseID.map(id => getCourseInstancePromise(id, semesterId))

    const courses = await Promise.all(coursePromises)

    const e = courses.filter(c => c instanceof Error).map(e => e.message)
    if (e.length > 0) return e

    const sectionPromises = courses.map((course, index) => {
      const { id } = course
      const sectionNumber = courseSectNum[index]
      return getSectionPromise(id, sectionNumber, courseID)
    })

    const sections = await Promise.all(sectionPromises)
    const e2 = sections.filter(s => s instanceof Error).map(e => e.message)
    if (e2.length > 0) return e2

    const insertPromises = sections.map(section => {
      const {id: sectionID, courseInstanceId} = section
      return insertStudyPromise(studentID, sectionID, courseInstanceId)
    })
    const results = await Promise.all(insertPromises)
    const e3 = results.filter(r => r instanceof Error).map(e => e.message)
    if (e3.length > 0) return e3
  }
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
  courseID
) {
  const rows = await db.section.query(
    `
      SELECT * FROM section
      WHERE courseInstanceId = ? AND sectionNumber = ?
    `,
    [courseInstanceID, sectionNumber]
  )
  if (rows.length === 0) {
    if (sectionNumber.length === 0)
      return new Error(`Section number cannot be empty`)
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
    return e
  }
}

router.get('/', (req, res) => {
  res.render('course/enroll', { title: 'Enroll Course', errors: [] })
})

router.post('/', async (req, res) => {
  console.log(req.body)
  const { studentID } = req.body
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
