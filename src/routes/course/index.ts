import * as express from 'express'

const router = express.Router()

router.get('/enroll', (req, res) => {
  res.render('course/enroll', { title: 'Enroll Course' })
})

router.post('/enroll', (req, res) => {
  console.log(req.body)
  res.redirect('/')
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

router.get('/manage', (req, res) => {
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

router.post('/remove', (req, res) => {
  console.log(req.body)
  res.redirect('/')
})

router.get('/pay', (req, res) => {
  res.render('course/pay', { title: 'Pay Fee' })
})

export default router
