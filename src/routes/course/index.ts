import * as express from 'express'
import manage from './manage'
import enroll from './enroll'
import search from './search'
import db from '~/db'
import { AdvancedConsoleLogger } from 'typeorm'

const router = express.Router()

router.use('/enroll', enroll)
router.use('/manage', manage)
router.use('/search', search)

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
