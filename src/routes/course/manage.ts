import * as express from 'express'
import db from '~/db'

const router = express.Router()

async function getSectionEnrolled(studentID) {
  const sectionRows = await db.section.query(
    `
      SELECT courseID, name as courseName, sectionNumber as section FROM study
      JOIN section ON study.sectionId = section.id
      JOIN course_instance ON section.courseInstanceId = course_instance.id
      JOIN course ON course_instance.courseCourseID = course.courseID
      JOIN semester ON course_instance.semesterId = semester.id
      WHERE semester.id = (SELECT id FROM semester ORDER BY semester.yearYear DESC, semester.semesterNumber DESC LIMIT 1)
      AND studentStudentID = ?
      AND study.gradeLetter != 'W'
    `,
    [studentID]
  )
  if (sectionRows.length === 0) {
    throw new Error('Cannot found section enrolled')
  }
  return sectionRows
}

router.get('/', async (req: any, res) => {
  let studentData
  const student = req.user
  const { studentID } = student
  let [withdrawable,removable] = [false,false]
  try {
    const lastWithdrawalDate = await getLastWithdrawalDateOfLatestSemester()
    const lastRemovalDate = await getLastRemovalDateOfLatestSemester()
    const now = new Date()
    if(lastRemovalDate.getDate() < now.getDate()) removable = false
    else removable = true
    if(lastWithdrawalDate.getDate() < now.getDate()) withdrawable = false
    else withdrawable = true

    console.log(student)
    const subjects = await getSectionEnrolled(studentID)
    const { firstName, lastName } = student
    studentData = {
      info: {
        studentID,
        firstName,
        lastName
      },
      subjects
    }
  } catch (e) {
    studentData = {
      info: {
        studentID,
        notFound: e.message
      }
    }
  }

  res.render('course/manage', {
    title: 'Manage Courses',
    studentData,
    studentID,
    withdrawable,
    removable
  })
})

enum Mode {
  remove,
  withdraw
}
async function handleRemoveWithdraw(body, mode: Mode) {
  let { studentID, remove } = body
  if (remove === undefined) return []
  if (typeof remove === 'string') {
    remove = [remove]
  }
  const resultPromises =
    mode === Mode.remove
      ? remove.map(rm => removePromise(rm, studentID))
      : remove.map(rm => withdrawPromise(rm, studentID))
  const results = await resultPromises
  const e = results.filter(r => r instanceof Error).map(e => e.map)
  if (e.length > 0) return e
  return []
}

async function getCurrentInstanceId(courseID) {
  const [{ id }] = await db.courseInstance.query(
    `
    SELECT id FROM course_instance CI
    WHERE courseCourseID = ? 
    AND semesterId = (SELECT id FROM semester ORDER BY semester.yearYear DESC, semester.semesterNumber DESC LIMIT 1)
  `,
    [courseID]
  )
  return id
}

async function removePromise(courseID: string, studentID: string) {
  const id = await getCurrentInstanceId(courseID)
  return await db.study.query(
    `
    DELETE S FROM study S
    JOIN section ON S.sectionId = section.id
    JOIN course_instance ON section.courseInstanceId = course_instance.id
    JOIN course ON course_instance.courseCourseID = course.courseID
    WHERE course_instance.id = ? AND S.studentStudentID = ?;
    `,
    [id, studentID]
  )
}

async function withdrawPromise(courseID: string, studentID: string) {
  const id = await getCurrentInstanceId(courseID)
  return await db.study.query(
    `
    UPDATE study S
    JOIN section ON S.sectionId = section.id
    JOIN course_instance ON section.courseInstanceId = course_instance.id
    JOIN course ON course_instance.courseCourseID = course.courseID
    SET S.gradeLetter = 'W'
    WHERE course_instance.id = ? AND S.studentStudentID = ?;
    `,
    [id, studentID]
  )
}

const getLastRemovalDateOfLatestSemester = async () => {
  const queryResult = await db.semester.query(`
    SELECT lastSubjectRemovalDate FROM semester
    WHERE id = (SELECT id FROM semester ORDER BY semester.yearYear DESC, semester.semesterNumber DESC LIMIT 1)
  `)
  return queryResult[0].lastSubjectRemovalDate
}

const getLastWithdrawalDateOfLatestSemester = async () => {
  const queryResult = await db.semester.query(`
    SELECT lastWithdrawalDate FROM semester
    WHERE id = (SELECT id FROM semester ORDER BY semester.yearYear DESC, semester.semesterNumber DESC LIMIT 1)
  `)
  return queryResult[0].lastWithdrawalDate
}

router.post('/', async (req, res) => {
  console.log(req.body)
  if (req.query.forceRemove) {
    const e = await handleRemoveWithdraw(req.body, Mode.remove)
  } else if (req.query.forceWithdraw) {
    // withdraw
    const e = await handleRemoveWithdraw(req.body, Mode.withdraw)
  } else {
    const lastRemovalDate = await getLastRemovalDateOfLatestSemester()
    console.log('lastremovaldate', lastRemovalDate)
    const now = new Date()
    if (lastRemovalDate.getTime() > now.getTime()) {
      // remove
      const e = await handleRemoveWithdraw(req.body, Mode.remove)
    } else {
      // withdraw
      const e = await handleRemoveWithdraw(req.body, Mode.withdraw)
    }
  }
  // if (e.length > 0) res.render('')
  res.redirect(req.baseUrl)
})

export default router
