import * as express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
  let studentData
  if(req.query.studentID !== undefined && req.query.studentID !== '') {
    studentData = {
      info: {
        studentID: '5891031221',
        firstName: 'Joe',
        lastName: 'Snorn'
      },
      subjects: [
        {
          courseID: '2110217',
          courseName: 'SOME SUBJ',
          section: 1
        },
        {
          courseID: '2110224',
          courseName: 'SOME SUBJ LAB',
          section: 33
        } 
      ]
    }
  }
  res.render('course/manage', { title: 'Manage Courses', studentData })
})


router.post('/', (req, res) => {
  console.log(req.body)
  res.redirect('/')
})

export default router
