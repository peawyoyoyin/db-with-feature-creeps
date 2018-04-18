import * as express from 'express'
import manage from './manage'
import enroll from './enroll'
import db from '~/db'
import { AdvancedConsoleLogger } from 'typeorm'

const router = express.Router()

router.use('/enroll', enroll)
router.use('/manage', manage)

router.get('/search', async (req, res) => {
  let searchResults = undefined
  const { courseID, courseName, semester, credits } = req.query
  const rawSemester = await db.semester
    .createQueryBuilder('semester')
    .leftJoinAndSelect('semester.year', 'year')
    .orderBy('year.year', 'DESC')
    .addOrderBy('semester.semesterNumber', 'DESC')
    .getMany()
  const semesters = rawSemester.map(semester => {
    const semesterId = semester.id
    const semesterNumber = semester.semesterNumber
    const yearNumber = semester.year.year
    const text = `${yearNumber}/${semesterNumber}`
    return {
      value: semesterId,
      text
    }
  })
  console.log(rawSemester)
  if (
    courseID !== undefined ||
    courseName !== undefined ||
    semester !== undefined ||
    credits !== undefined
  ) {
    const rawSearchResults = await db.courseInstance
      .createQueryBuilder('instance')
      .leftJoinAndSelect('instance.course', 'course')
      .where('course.name like :name', {name: `${courseName}%`})
      .getMany()
    console.log(rawSearchResults)
    searchResults = rawSearchResults.map(instance => {
      const {abbreviate: courseName, courseID, credit: credits} = instance.course
      return {
        courseID,
        courseName,
        credits
      }
    })
  }
  res.render('course/search', {
    title: 'Search Courses',
    searchCourseID: courseID,
    searchCourseName: courseName,
    searchCredits: credits,
    searchResults,
    semesters,
    selectedSemester: semester
  })
})

router.get('/detail/:id', (req, res) => {
  let course = {
    courseID: '2110117',
    courseName: 'SOME SUBJ',
    credits: 3,
    sections: [
      {
        sectionNumber: 1,
        capacity: 40,
        teacher: {
          firstName: 'John',
          lastName: 'Snoe',
          abbrName: 'JSN'
        }
      },
      {
        sectionNumber: 2,
        capacity: 20,
        teacher: {
          firstName: 'Jorn',
          lastName: 'Though',
          abbrName: 'JTH'
        }
      }
    ]
  }

  res.render('course/detail', {
    title: req.params.id,
    course
  })
})

router.get('/pay', (req, res) => {
  res.render('course/pay', { title: 'Pay Fee' })
})

export default router
