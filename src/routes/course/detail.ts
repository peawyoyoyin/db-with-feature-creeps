import * as express from 'express'
import db from '~/db'

const router = express.Router()

router.get('/:id', (req, res) => {
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

export default router
