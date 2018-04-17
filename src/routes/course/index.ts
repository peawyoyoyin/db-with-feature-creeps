import * as express from 'express'
import manage from './manage'
import enroll from './enroll'

const router = express.Router()

router.use('/enroll', enroll)
router.use('/manage', manage)

router.get('/search', (req, res) => {
  let searchResults = undefined
  const {courseID, courseName, credits} = req.query;
  const queries = [
    {name: 'courseID', value: courseID},
    {name: 'courseName', value: courseName},
    {name: 'credits', value: credits}
  ]
  const findOptions = 
    queries
      .filter(query => query.value !== undefined && query.value.length > 0)
      .reduce((acc, query) => {
        const {name, value} = query
        return {
          ...acc,
          [name]: value
        }
      }, {})
  console.log(findOptions)
  if(courseID !== undefined || courseName !== undefined || credits !== undefined) {
    searchResults = [
      {
        courseID: '2110217',
        courseName: 'SOME SUBJ',
        credits: 3
      },
      {
        courseID: '2110231',
        courseName: 'SOME OTHER SUBJ',
        credits: 3
      },
      {
        courseID: '2110442',
        courseName: 'SOME SUBJ LAB',
        credits: 1
      }
    ]
  }
  res.render('course/search', { title: 'Search Courses', searchResults })
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
