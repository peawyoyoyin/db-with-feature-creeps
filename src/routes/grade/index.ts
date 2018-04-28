import * as express from 'express'
import db from '~/db'

const router = express.Router()

router.get('/', async (req: any, res) => {
  const { studentID } = req.user
  let gradeData = {};
  let gradeDataRaw = await db._connection.manager.query(
    `
      SELECT abbreviate, courseCourseID, gradeLetter, semesterNumber, yearYear FROM study 
      LEFT JOIN course_instance ON (study.instanceId = course_instance.id) 
      LEFT JOIN semester ON (course_instance.semesterId = semester.id) 
      LEFT JOIN course ON (course_instance.courseCourseID = course.courseID)
      WHERE studentStudentID = ?
      ORDER BY yearYear, semesterNumber
    `,
    [studentID]
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
  res.render('grade/grade', { gradeData, studentID })
  console.log(gradeData)
})

export default router
