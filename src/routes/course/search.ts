import * as express from 'express'
import db from '~/db'

const router = express.Router()

async function getAllSemester() {
  const semesters = await db.semester.query(`
    SELECT id, semesterNumber, yearYear FROM semester
    ORDER BY yearYear DESC, semesterNumber DESC
  `)
  return semesters
}

async function searchCourses(courseID, courseName, semesterID, credit) {
  const queryStr = `
    SELECT course_instance.id, abbreviate, courseID, credit FROM course_instance
    JOIN course ON course_instance.courseCourseID = course.courseID
    JOIN semester ON course_instance.semesterId = semester.id
  `

  const whereCourseID = courseID ? ` WHERE course.courseID LIKE ? ` : ''
  const argCourseId = courseID ? [`${courseID}%`] : []

  const delimCourseName = courseName
    ? whereCourseID
      ? ' AND '
      : ' WHERE '
    : ''
  const whereCourseName = courseName ? ` course.name LIKE ? ` : ''
  const argCourseName = courseName ? [`${courseName}%`] : []

  const delimSemesterID = semesterID
    ? whereCourseID || whereCourseName
      ? ' AND '
      : ' WHERE '
    : ''
  const whereSemesterID = semesterID ? ` semester.id = ? ` : ''
  const argSemesterID = semesterID ? [semesterID] : []

  const delimCredit = credit
    ? whereCourseID || whereCourseName || whereSemesterID
      ? ' AND '
      : ' WHERE '
    : ''
  const whereCredit = credit ? ` course.credit = ? ` : ''
  const argCredit = credit ? [credit] : []

  const courseInstances = await db.courseInstance.query(
    queryStr +
      whereCourseID +
      delimCourseName +
      whereCourseName +
      delimSemesterID +
      whereSemesterID +
      delimCredit +
      whereCredit,
    [...argCourseId, ...argCourseName, ...argSemesterID, ...argCredit]
  )
  return courseInstances
}

router.get('/', async (req: any, res) => {
  let searchResults = undefined
  const { courseID, courseName, semester, credits } = req.query
  const rawSemester = await getAllSemester()
  // console.log(rawSemester)
  const semesters = rawSemester.map(semester => {
    const semesterId = semester.id
    const semesterNumber = semester.semesterNumber
    const yearNumber = semester.yearYear
    const text = `${yearNumber}/${semesterNumber}`
    return {
      value: semesterId,
      text,
    }
  })
  // console.log('hello', semesters)
  if (
    courseID !== undefined ||
    courseName !== undefined ||
    semester !== undefined ||
    credits !== undefined
  ) {
    const searchRows = await searchCourses(
      courseID,
      courseName,
      semester,
      credits
    )
    // console.log(rawSearchResults)
    searchResults = searchRows.map(row => {
      // console.log(instance)
      const {
        id: instanceID,
        abbreviate: courseName,
        courseID,
        credit: credits,
      } = row
      return {
        courseID,
        courseName,
        credits,
        instanceID,
      }
    })
  }
  const { renderOptions } = req
  res.render('course/search', {
    title: 'Search Courses',
    searchCourseID: courseID,
    searchCourseName: courseName,
    searchCredits: credits,
    searchResults,
    semesters,
    selectedSemester: semester,
    ...renderOptions,
  })
})

export default router
