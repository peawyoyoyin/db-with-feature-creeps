import * as express from 'express'
import db from '~/db'

const router = express.Router()

router.get('/', async (req, res) => {
  const { sid } = req.query
  let gradeData = {};
  let gradeDataRaw = await db._connection.manager.query(
    `
      SELECT abbreviate, courseCourseID, gradeLetter, semesterNumber, yearYear FROM study 
      LEFT JOIN section ON (study.sectionId = section.id) 
      LEFT JOIN course_instance ON (section.courseInstanceId = course_instance.id) 
      LEFT JOIN semester ON (course_instance.semesterId = semester.id) 
      LEFT JOIN course ON (course_instance.courseCourseID = course.courseID)
      WHERE studentStudentID = ?
      ORDER BY yearYear, semesterNumber
    `,
    [sid]
  )
  if (gradeDataRaw.length === 0) gradeData = undefined
  else {
    for (let i = 0; i < gradeDataRaw.length; i++) {
      let semesterString = gradeDataRaw[i].yearYear.toString() + " semester " + gradeDataRaw[i].semesterNumber.toString()
      if(gradeData[semesterString]) {
        gradeData[semesterString].courses.push(gradeDataRaw[i])
      }
      else {
        gradeData[semesterString] = {}
        gradeData[semesterString].semester = semesterString
        gradeData[semesterString].courses = [gradeDataRaw[i]]
      }
    }
  }
  res.render('grade/grade', { gradeData, sid })
  console.log(gradeData)
})

export default router
