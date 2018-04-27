import * as express from 'express'
import course from './course'
import grade from './grade'

const router = express.Router()

router.use('/', (req: any, res, next) => {
  if (!req.user.studentID) res.redirect('/teacher')
  else next()
})

router.use('/course', course)

router.use('/grade', grade)

export default router
