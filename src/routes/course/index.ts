import * as express from 'express'

const router = express.Router()

router.get('/enroll', (req, res) => {
  res.render('course/enroll', { title: 'Enroll Course' })
})

router.get('/search', (req, res) => {
  res.render('course/search', { title: 'Search Courses' })
})

router.get('/manage', (req, res) => {
  res.render('course/manage', { title: 'Manage Courses' })
})

router.get('/pay', (req, res) => {
  res.render('course/pay', { title: 'Pay Fee' })
})

export default router
