import * as express from 'express'
import db from '~/db'

const router = express.Router()


router.get('/', async (req, res) => {
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
  // console.log(rawSemester)
  if (
    courseID !== undefined ||
    courseName !== undefined ||
    semester !== undefined ||
    credits !== undefined
  ) {
    let rawSearchResults = db.courseInstance
      .createQueryBuilder('instance')
      .leftJoinAndSelect('instance.course', 'course')
      .leftJoinAndSelect('instance.semester', 'semester')
    if (courseID !== undefined) {
      rawSearchResults = rawSearchResults.andWhere('course.courseID like :id', {
        id: `${courseID}%`
      })
    }
    if (courseName !== undefined) {
      rawSearchResults = rawSearchResults.andWhere('course.name like :name', {
        name: `${courseName}%`
      })
    }
    if (semester !== undefined) {
      rawSearchResults = rawSearchResults.andWhere('semester.id = :semester', {
        semester 
      })
    }
    if (credits !== undefined && credits !== '') {
      rawSearchResults = rawSearchResults.andWhere('course.credit = :credit', {
        credit: credits
      })
    }

    // console.log(rawSearchResults)
    searchResults = (await rawSearchResults.getMany()).map(instance => {
      console.log(instance)
      const {
        abbreviate: courseName,
        courseID,
        credit: credits
      } = instance.course
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

export default router

