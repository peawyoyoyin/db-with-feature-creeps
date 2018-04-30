import * as express from 'express'
import course from './course'
import grade from './grade'
import { teacherSenior } from './seniorproj'

const router = express.Router()

router.use('/', (req: any, res, next) => {
  if (!req.user.teacherID) {
    res.redirect('/student')
  } else {
    req.renderOptions = { sidebarVariation: 'teacher' }
    next()
  }
})

router.get('/', (req: any, res) => {
  const { renderOptions } = req
  // console.log('variation', sidebarVariation)
  res.render('index', {
    ...renderOptions,
  })
})

router.use('/seniorproj', teacherSenior)

export default router
