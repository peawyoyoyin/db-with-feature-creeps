import * as express from 'express'
import db from '~/db'
import { CourseInstance } from '~/entity/course-instance'

const router = express.Router()

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const rawCourseInstance = await db.courseInstance
    .createQueryBuilder('instance')
    .where('instance.id = :id', { id })
    .leftJoinAndSelect('instance.course', 'course')
    .leftJoinAndSelect('instance.sections', 'section')
    .leftJoinAndSelect('section.teacher', 'teacher')
    .orderBy('section.sectionNumber', 'ASC')
    .getOne()
  console.log(rawCourseInstance)
  console.log(rawCourseInstance.sections)
  function convertToPugInfo(instance: CourseInstance) {
    const { course, sections: rawSections } = instance
    const { courseID, name: courseName, credit: credits } = course
    const sections = rawSections.map(section => {
      const { sectionNumber, capacity, teacher: rawTeacher, time } = section
      const { firstName, lastName, abbrName } = rawTeacher
      const teacher = { firstName, lastName, abbrName }
      return {
        sectionNumber,
        capacity,
        teacher,
        time
      }
    })
    return {
      courseID,
      courseName,
      credits,
      sections
    }
  }
  const course = convertToPugInfo(rawCourseInstance)
  // let course = {
  //   courseID: '2110117',
  //   courseName: 'SOME SUBJ',
  //   credits: 3,
  //   sections: [
  //     {
  //       sectionNumber: 1,
  //       capacity: 40,
  //       teacher: {
  //         firstName: 'John',
  //         lastName: 'Snoe',
  //         abbrName: 'JSN'
  //       }
  //     },
  //     {
  //       sectionNumber: 2,
  //       capacity: 20,
  //       teacher: {
  //         firstName: 'Jorn',
  //         lastName: 'Though',
  //         abbrName: 'JTH'
  //       }
  //     }
  //   ]
  // }

  res.render('course/detail', {
    title: course.courseName,
    course
  })
})

export default router
