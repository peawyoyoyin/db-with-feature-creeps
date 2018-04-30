import * as express from 'express'
import course from './course'
import grade from './grade'
import { studentSenior } from './seniorproj'

const router = express.Router()

router.use('/', (req: any, res, next) => {
  if (!req.user.studentID) {
    res.redirect('/teacher')
  }
  else {
    req.renderOptions = { sidebarVariation: 'student' }
    next()
  }
})

router.get('/', (req: any, res) => {
  const { renderOptions } = req
  res.render('index', {
    ...renderOptions,
  })
})

router.use('/course', course)

router.use('/grade', grade)

router.use('/seniorproj', studentSenior)

export default router
