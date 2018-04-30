import * as express from 'express'
import db from '~/db'
import { CourseInstance } from '~/entity/course-instance'

const router = express.Router()

async function getCourse(courseInstanceId) {
  const course = await db.course.query(
    `
    SELECT courseID, name AS courseName, credit AS credits FROM course_instance
    JOIN course ON course_instance.courseCourseID = course.courseID
    WHERE course_instance.id = ?
  `,
    [courseInstanceId]
  )
  return course[0]
}

async function getSections(courseInstanceId) {
  const sections = await db.section.query(
    `
    SELECT sectionNumber, capacity, firstName, lastName, abbrName, time FROM section
    JOIN teacher ON section.teacherTeacherID = teacher.teacherID
    WHERE courseInstanceId = ?
    `,
    [courseInstanceId]
  )
  return sections
}

router.get('/:id', async (req: any, res) => {
  const { id } = req.params
  const rawCourse = await getCourse(id)
  const rawSections = (await getSections(id)).map(section => {
    const {
      sectionNumber,
      capacity,
      time,
      firstName,
      lastName,
      abbrName,
    } = section
    const teacher = { firstName, lastName, abbrName }
    return {
      sectionNumber,
      capacity,
      time,
      teacher,
    }
  })
  const course = { ...rawCourse, sections: rawSections }
  console.log(course)
  const { renderOptions } = req
  res.render('course/detail', {
    title: course.courseName,
    course,
    ...renderOptions,
  })
})

export default router
