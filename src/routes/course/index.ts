import * as express from 'express'

const router = express.Router()

router.get('/enroll', (req, res) => {
  res.render('course/enroll', { title: 'Enroll Course' })
})

router.get('/search', (req, res) => {
  let searchResults = undefined
  if(req.query.courseID !== undefined || req.query.courseName !== undefined || req.query.credits !== undefined) {
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
  res.render('course/detail', { title: req.params.id })
})

router.get('/manage', (req, res) => {
  res.render('course/manage', { title: 'Manage Courses' })
})

router.get('/pay', (req, res) => {
  res.render('course/pay', { title: 'Pay Fee' })
})

export default router
